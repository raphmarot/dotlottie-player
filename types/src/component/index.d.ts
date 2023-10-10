import { LitElement } from 'lit';
import { PlayMode, PlayerState } from './types';
import type { CSSResult } from 'lit';
import type { AnimationDirection, AnimationItem, AnimationSegment, RendererType } from 'lottie-web';
import type { Autoplay, Config, Controls, Loop, LottieJSON, ObjectFit, PreserveAspectRatio, Subframe } from './types';
export declare class DotLottiePlayer extends LitElement {
    autoplay?: Autoplay;
    background?: string;
    controls?: Controls;
    count?: number;
    currentState?: PlayerState;
    description?: string;
    direction?: AnimationDirection;
    hover?: boolean | undefined;
    intermission?: number | undefined;
    loop?: Loop;
    mode?: PlayMode;
    objectfit?: ObjectFit;
    preserveAspectRatio?: PreserveAspectRatio;
    renderer?: RendererType;
    segment?: AnimationSegment;
    simple?: boolean;
    speed?: number;
    src: string;
    subframe?: Subframe;
    protected container: HTMLElement;
    private _isSettingsOpen;
    private _seeker;
    private _currentAnimation;
    private _intersectionObserver?;
    private _lottieInstance;
    private _identifier;
    private _errorMessage;
    private _isDotLottie;
    private _manifest;
    private _animations;
    private _playerState;
    private _getOptions;
    load(src: string | LottieJSON): Promise<void>;
    private _addEventListeners;
    private _onVisibilityChange;
    private _handleSeekChange;
    private _isLottie;
    addAnimation(configs: Config[], fileName?: string, triggerDownload?: boolean): Promise<void | ArrayBuffer>;
    getLottie(): AnimationItem | null;
    play(): void;
    pause(): void;
    stop(): void;
    destroy(): void;
    seek(value: number | string): void;
    snapshot(): string | undefined;
    setSubframe(value: boolean): void;
    private _freeze;
    reload(): Promise<void>;
    setSpeed(value?: number): void;
    setDirection(value: AnimationDirection): void;
    setLooping(value: boolean): void;
    togglePlay(): void;
    toggleLooping(): void;
    toggleBoomerang(): void;
    private _toggleSettings;
    private _switchInstance;
    next(): void;
    prev(): void;
    convert(download?: boolean): void;
    static get styles(): CSSResult;
    connectedCallback(): void;
    protected firstUpdated(): Promise<void>;
    disconnectedCallback(): void;
    protected renderControls(): import("lit").TemplateResult<1>;
    protected render(): import("lit").TemplateResult<1>;
}
