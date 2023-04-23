import { Touch } from '../inputs/Touch';

/**
 * @class AssetStore - A singleton class that stores all the assets.
 * @public
 */
export class AssetStore {
  private static _instance: AssetStore;
  private _sounds: Map<string, HTMLAudioElement>;
  private _images: Map<string, HTMLImageElement>;
  private _fontsToLoad: { name: string; url: string }[];
  private _soundsToLoad: { name: string; url: string }[];
  private _imagesToLoad: { name: string; url: string }[];

  /**
   * @constructor
   * @private
   */
  private constructor() {
    this._sounds = new Map<string, HTMLAudioElement>();
    this._images = new Map<string, HTMLImageElement>();
    this._fontsToLoad = [];
    this._soundsToLoad = [];
    this._imagesToLoad = [];
  }

  /**
   * @get instance - The instance of the AssetStore class.
   * @returns {AssetStore} The instance of the AssetStore class.
   * @public
   * @example
   * AssetStore.instance;
   */
  public static get instance(): AssetStore {
    if (!this._instance) this._instance = new AssetStore();
    return this._instance;
  }

  /**
   * @get sounds - The map of all the sounds.
   * @returns {Map<string, HTMLAudioElement>} The map of all the sounds.
   * @public
   * @example
   * ServiceContainer.AssetStore.sounds;
   */
  public get sounds(): Map<string, HTMLAudioElement> {
    return this._sounds;
  }

  /**
   * @get images - The map of all the images.
   * @returns {Map<string, HTMLImageElement>} The map of all the images.
   * @public
   * @example
   * ServiceContainer.AssetStore.images;
   */
  public get images(): Map<string, HTMLImageElement> {
    return this._images;
  }

  /**
   * @method addFont - Adds a font to the AssetStore.
   * @param {string} name - The name of the font.
   * @param {string} url - The url of the font.
   * @returns {void}
   * @public
   * @example
   * ServiceContainer.AssetStore.addFont('myFont', 'myFontUrl');
   */
  public addFont(name: string, url: string): void {
    this._fontsToLoad.push({ name, url });
  }

  /**
   * @method addSound - Adds a sound to the AssetStore.
   * @param {string} name - The name of the sound.
   * @param {string} url - The url of the sound.
   * @returns {void}
   * @public
   * @example
   * ServiceContainer.AssetStore.addSound('mySound', 'mySoundUrl');
   */
  public addSound(name: string, url: string): void {
    this._soundsToLoad.push({ name, url });
  }

  /**
   * @method addImage - Adds an image to the AssetStore.
   * @param {string} name - The name of the image.
   * @param {string} url - The url of the image.
   * @returns {void}
   * @public
   * @example
   * ServiceContainer.AssetStore.addImage('myImage', 'myImageUrl');
   */
  public addImage(name: string, url: string): void {
    this._imagesToLoad.push({ name, url });
  }

  /**
   * @method getSound - Gets a sound from the AssetStore.
   * @param {string} name - The name of the sound.
   * @returns {HTMLAudioElement} The sound.
   * @public
   * @example
   * ServiceContainer.AssetStore.getSound('mySound');
   */
  public getSound(name: string): HTMLAudioElement {
    if (!this._sounds.has(name))
      throw new Error(`Sound with name ${name} does not exist`);
    return this._sounds.get(name) as HTMLAudioElement;
  }

  /**
   * @method getImage - Gets an image from the AssetStore.
   * @param {string} name - The name of the image.
   * @returns {HTMLImageElement} The image.
   * @public
   * @example
   * ServiceContainer.AssetStore.getImage('myImage');
   */
  public getImage(name: string): HTMLImageElement {
    if (!this._images.has(name))
      throw new Error(`Image with name ${name} does not exist`);
    return this._images.get(name) as HTMLImageElement;
  }

  /**
   * @method loadAllAssets - Loads all the assets.
   * @returns {Promise<void[]>} A promise that resolves when all the assets are loaded.
   * @public
   * @example
   * ServiceContainer.AssetStore.loadAllAssets();
   */
  public loadAllAssets(): Promise<void[]> {
    const imagesPromise = this._imagesToLoad.map((imageToLoad) => {
      return new Promise<void>((resolve, reject) => {
        this._loadImage(imageToLoad.name, imageToLoad.url);
        const image = this._images.get(imageToLoad.name) as HTMLImageElement;
        image.onload = () => resolve();
        image.onerror = (err) => reject(err);
      });
    });

    const soundsPromise = this._soundsToLoad.map((soundToLoad) => {
      return new Promise<void>((resolve, reject) => {
        this._loadSound(soundToLoad.name, soundToLoad.url);
        const sound = this._sounds.get(soundToLoad.name) as HTMLAudioElement;
        sound.oncanplaythrough = () => {
          if (Touch.instance.isTouchScreen)
            this._unlockAudioForIOS(soundToLoad.name);
          resolve();
        };
        sound.onerror = (err) => reject(err);
      });
    });

    const fontsPromise = this._fontsToLoad.map((fontToLoad) => {
      return new Promise<void>((resolve, reject) => {
        this._loadFont(fontToLoad.name, fontToLoad.url);
        resolve();
      });
    });

    return Promise.all([...imagesPromise, ...soundsPromise, ...fontsPromise]);
  }

  /**
   * @method _loadFont - Loads a font.
   * @param {string} name - The name of the font.
   * @param {string} url - The url of the font.
   * @returns {Promise<void>} A promise that resolves when the font is loaded.
   * @private
   * @example
   * AssetStore.instance._loadFont('myFont', 'myFontUrl');
   */
  private async _loadFont(name: string, url: string): Promise<void> {
    const font = new FontFace(name, `url(${url})`);
    await font.load();
    document.fonts.add(font);
  }

  /**
   * @method _loadSound - Loads a sound to the AssetStore.
   * @param {string} name - The name of the sound.
   * @param {string} url - The url of the sound.
   * @returns {void}
   * @private
   * @example
   * AssetStore.instance._loadSound('mySound', 'mySoundUrl');
   */
  private _loadSound(name: string, url: string): void {
    if (this._sounds.has(name))
      throw new Error(`Sound with name ${name} already exists`);
    const audio = new Audio(url);
    this._sounds.set(name, audio);
  }

  /**
   * @method _loadImage - Loads an image to the AssetStore.
   * @param {string} name - The name of the image.
   * @param {string} url - The url of the image.
   * @returns {void}
   * @private
   * @example
   * AssetStore.instance._loadImage('myImage', 'myImageUrl');
   */
  private _loadImage(name: string, url: string): void {
    if (this._images.has(name))
      throw new Error(`Image with name ${name} already exists`);
    const image = new Image();
    image.src = url;
    this._images.set(name, image);
  }

  /**
   * @method _unlockAudioForIOS - Unlocks the audio for IOS.
   * @param {string} name - The name of the sound.
   * @returns {void}
   * @private
   * @example
   * AssetStore.instance._unlockAudioForIOS('mySound');
   * @see https://stackoverflow.com/questions/12517000/no-sound-on-ios-6-web-audio-api
   */
  private _unlockAudioForIOS(name: string): void {
    const sound = this._sounds.get(name) as HTMLAudioElement;
    const unlock = async () => {
      await sound.play();
      sound.pause();
      sound.currentTime = 0;
      document.body.removeEventListener('touchstart', unlock);
    };
    document.body.addEventListener('touchstart', unlock);
  }
}
