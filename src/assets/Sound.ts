import { SoundState } from '../enums/SoundState';
import { AssetStore } from './AssetStore';

/**
 * @class Sound - A class that represents a sound.
 * @public
 */
export class Sound {
  private _name: string;
  private _audio: HTMLAudioElement;
  private _state: SoundState;

  /**
   * @constructor
   * @param {string} name - The name of the sound.
   * @param {boolean} [loop=false] - Whether or not the sound should loop.
   * @public
   * @example
   * const sound = new Sound('sound');
   * @example
   * const sound = new Sound('sound', true);
   */
  public constructor(name: string, loop: boolean = false) {
    const audio = AssetStore.instance.sounds.get(name);
    if (!audio) throw new Error(`Sound ${name} does not exist.`);

    this._name = name;
    this._audio = audio;
    this._audio.loop = loop;
    this._state = SoundState.Stopped;
  }

  /**
   * @get name - Gets the name of the sound.
   * @returns {string} The name of the sound.
   * @public
   * @example
   * const sound = new Sound('sound');
   * const name = sound.name;
   */
  public get name(): string {
    return this._name;
  }

  /**
   * @get isPlaying - Gets whether or not the sound is playing.
   * @returns {boolean} Whether or not the sound is playing.
   * @public
   * @example
   * const sound = new Sound('sound');
   * const isPlaying = sound.isPlaying;
   */
  public get isPlaying(): boolean {
    return this._state === SoundState.Playing;
  }

  /**
   * @get isPaused - Gets whether or not the sound is paused.
   * @returns {boolean} Whether or not the sound is paused.
   * @public
   * @example
   * const sound = new Sound('sound');
   * const isPaused = sound.isPaused;
   */
  public get isPaused(): boolean {
    return this._state === SoundState.Paused;
  }

  /**
   * @get isStopped - Gets whether or not the sound is stopped.
   * @returns {boolean} Whether or not the sound is stopped.
   * @public
   * @example
   * const sound = new Sound('sound');
   * const isStopped = sound.isStopped;
   */
  public get isStopped(): boolean {
    return this._state === SoundState.Stopped;
  }

  /**
   * @get volume - Gets the volume of the sound.
   * @returns {number} The volume of the sound.
   * @public
   * @example
   * const sound = new Sound('sound');
   * const volume = sound.volume;
   */
  public get volume(): number {
    return this._audio.volume;
  }

  /**
   * @set volume - Sets the volume of the sound.
   * @param {number} value - The volume of the sound.
   * @public
   * @example
   * const sound = new Sound('sound');
   * sound.volume = 0.5;
   */
  public set volume(value: number) {
    this._audio.volume = value;
  }

  /**
   * @get muted - Gets whether or not the sound is muted.
   * @returns {boolean} Whether or not the sound is muted.
   * @public
   * @example
   * const sound = new Sound('sound');
   * const muted = sound.muted;
   */
  public get muted(): boolean {
    return this._audio.muted;
  }

  /**
   * @set muted - Sets whether or not the sound is muted.
   * @param {boolean} value - Whether or not the sound is muted.
   * @public
   * @example
   * const sound = new Sound('sound');
   * sound.muted = true;
   */
  public set muted(value: boolean) {
    this._audio.muted = value;
  }

  /**
   * @get loop - Gets whether or not the sound is looping.
   * @returns {boolean} Whether or not the sound is looping.
   * @public
   * @example
   * const sound = new Sound('sound');
   * const loop = sound.loop;
   */
  public get loop(): boolean {
    return this._audio.loop;
  }

  /**
   * @set loop - Sets whether or not the sound is looping.
   * @param {boolean} value - Whether or not the sound is looping.
   * @public
   * @example
   * const sound = new Sound('sound');
   * sound.loop = true;
   */
  public set loop(value: boolean) {
    this._audio.loop = value;
  }

  /**
   * @get currentTime - Gets the current time of the sound.
   * @returns {number} The current time of the sound.
   * @public
   * @example
   * const sound = new Sound('sound');
   * const currentTime = sound.currentTime;
   */
  public get currentTime(): number {
    return this._audio.currentTime;
  }

  /**
   * @set currentTime - Sets the current time of the sound.
   * @param {number} value - The current time of the sound.
   * @public
   * @example
   * const sound = new Sound('sound');
   * sound.currentTime = 5;
   */
  public set currentTime(value: number) {
    this._audio.currentTime = value;
  }

  /**
   * @get duration - Gets the duration of the sound.
   * @returns {number} The duration of the sound.
   * @public
   * @example
   * const sound = new Sound('sound');
   * const duration = sound.duration;
   */
  public get duration(): number {
    return this._audio.duration;
  }

  /**
   * @method play - Plays the sound.
   * @returns {Sound} The sound.
   * @public
   * @example
   * const sound = new Sound('sound');
   * sound.play();
   */
  public play(): Sound {
    this._audio.play();
    this._state = SoundState.Playing;
    return this;
  }

  /**
   * @method pause - Pauses the sound.
   * @returns {Sound} The sound.
   * @public
   * @example
   * const sound = new Sound('sound');
   * sound.pause();
   */
  public pause(): Sound {
    this._audio.pause();
    this._state = SoundState.Paused;
    return this;
  }

  /**
   * @method stop - Stops the sound.
   * @returns {Sound} The sound.
   * @public
   * @example
   * const sound = new Sound('sound');
   * sound.stop();
   */
  public stop(): Sound {
    this._audio.pause();
    this._audio.currentTime = 0;
    this._state = SoundState.Stopped;
    return this;
  }
}
