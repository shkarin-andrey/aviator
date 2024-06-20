export type CustomWindow = Window & {
  Telegram: Telegram;
};

export type WebView = {
  initParams: Record<string, any>;
  isIframe: boolean;

  onEvent(eventType: string, callback: (...args: any[]) => any): void;

  offEvent(eventType: string, callback: (...args: any[]) => any): void;

  postEvent(eventType: string, callback?: (...args: any[]) => any, eventData?: unknown): void;

  receiveEvent(eventType: string, eventData: unknown): void;

  callEventCallbacks(eventType: string, func: (...args: any[]) => any): void;
};

export type Utils = {
  urlSafeDecode(urlencoded: string): string;

  urlParseQueryString(queryString: string): Record<string, any>;

  urlParseHashParams(locationHash: string): Record<string, any>;

  urlAppendHashParams(url: string, addHash: string): string;

  sessionStorageSet(key: string, value: unknown): boolean;

  sessionStorageGet(key: string): string | object | null;
};

export type ThemeParams = {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
};

export type PopupButton = {
  id?: string;
  type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
  text?: string;
};

export type PopupParams = {
  title?: string;
  message: string;
  buttons?: PopupButton[];
};

export type ScanQrPopupParams = {
  text?: string;
};

export type ChatType = 'users' | 'bots' | 'groups' | 'channels';

export type WebAppUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  is_premium?: true;
  photo_url?: string;
};

export type WebAppChat = {
  id: number;
  type: 'group' | 'supergroup' | 'channel';
  title: string;
  username?: string;
  photo_url?: string;
};

export type WebAppInitData = {
  query_id?: string;
  user?: WebAppUser & {
    language_code?: string;
    added_to_attachment_menu?: true;
    allows_write_to_pm?: true;
  };
  receiver?: WebAppUser & {
    is_bot?: boolean;
  };
  chat?: WebAppChat;
  chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
  chat_instance?: string;
  start_param?: string;
  can_send_after?: number;
  auth_date: string;
  hash: string;
};

export type BackButton = {
  isVisible: boolean;
  onClick(callback: (...args: any[]) => any): BackButton;
  offClick(callback: (...args: any[]) => any): BackButton;
  show(): BackButton;
  hide(): BackButton;
};

export type MainButtonParams = {
  text: string;
  color: string;
  text_color: string;
  is_active: boolean;
  is_visible: boolean;
};

export type MainButton = {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isActive: boolean;
  readonly isProgressVisible: boolean;
  setText(text: string): MainButton;
  onClick(callback: (...args: any[]) => any): MainButton;
  offClick(callback: (...args: any[]) => any): MainButton;
  show(): MainButton;
  hide(): MainButton;
  enable(): MainButton;
  disable(): MainButton;
  showProgress(leaveActive?: boolean): MainButton;
  hideProgress(): MainButton;
  setParams(params: MainButtonParams): MainButton;
};

export type SettingsButton = {
  isVisible: boolean;
  onClick(callback: (...args: any[]) => any): SettingsButton;
  offClick(callback: (...args: any[]) => any): SettingsButton;
  show(): SettingsButton;
  hide(): SettingsButton;
};

export type HapticFeedback = {
  impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): HapticFeedback;
  notificationOccurred(type: 'error' | 'success' | 'warning'): HapticFeedback;
  selectionChanged(): HapticFeedback;
};

export type CloudStorage = {
  setItem(key: string, value: string, callback?: (error: null | Error, success: boolean) => void): CloudStorage;
  getItem(key: string, callback?: (error: null | Error, value: string) => void): CloudStorage;
  getItems(keys: string[], callback?: (error: null | Error, values: string[]) => void): CloudStorage;
  removeItem(key: string, callback?: (error: null | Error, success: boolean) => void): CloudStorage;
  removeItems(keys: string[], callback?: (error: null | Error, success: boolean) => void): CloudStorage;
  getKeys(callback: (error: null | Error, keys: string[]) => void): CloudStorage;
};

export type BiometricManagerRequestAccessParams = {
  reason: string;
};

export type BiometricManagerAuthenticateParams = {
  reason: string;
};

export type BiometricManager = {
  readonly isInited: boolean;
  readonly isBiometricAvailable: boolean;
  readonly biometricType: 'finger' | 'face' | 'unknown';
  readonly isAccessRequested: boolean;
  readonly isAccessGranted: boolean;
  readonly isBiometricTokenSaved: boolean;
  readonly deviceId: string;

  init(callback?: () => void): BiometricManager;
  requestAccess(params: BiometricManagerRequestAccessParams, callback?: () => void): BiometricManager;
  authenticate(params: BiometricManagerAuthenticateParams, callback?: () => void): BiometricManager;
  updateBiometricToken(token: string, callback?: () => void): BiometricManager;
  openSettings(): BiometricManager;
};

export type TelegramWebApp = {
  readonly initData: string;
  readonly initDataUnsafe: WebAppInitData;
  readonly version: string;
  readonly platform: string;
  readonly colorScheme: string;
  readonly themeParams: ThemeParams;
  readonly isExpanded: boolean;
  readonly viewportHeight: number;
  readonly viewportStableHeight: number;

  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  backgroundColor: string;

  BackButton: BackButton;
  MainButton: MainButton;
  SettingsButton: SettingsButton;
  HapticFeedback: HapticFeedback;
  CloudStorage: CloudStorage;
  BiometricManager: BiometricManager;

  setHeaderColor(color_key: string): void;

  setBackgroundColor(color: string): void;

  enableClosingConfirmation(): void;

  disableClosingConfirmation(): void;

  isVersionAtLeast(ver: string): boolean;

  onEvent(eventType: string, callback: (...args: any[]) => any): void;

  offEvent(eventType: string, callback: (...args: any[]) => any): void;

  sendData(data: unknown): void;

  switchInlineQuery(query: string, choose_chat_types?: ChatType[]): void;

  openLink(url: string, options?: object): void;

  openTelegramLink(url: string): void;

  openInvoice(url: string, callback?: (...args: any[]) => any): void;

  showPopup(params: PopupParams, callback?: (...args: any[]) => any): void;

  showAlert(message: string, callback?: (...args: any[]) => any): void;

  showConfirm(message: string, callback?: (...args: any[]) => any): void;

  showScanQrPopup(params: ScanQrPopupParams, callback?: (...args: any[]) => any): void;

  closeScanQrPopup(): void;

  readTextFromClipboard(callback?: (...args: any[]) => any): void;

  requestWriteAccess(callback?: (...args: any[]) => any): void;

  requestContact(callback?: (...args: any[]) => any): void;

  invokeCustomMethod(method: string, params: object, callback?: (...args: any[]) => any): void;

  ready(): void;

  expand(): void;

  close(): void;
};

export type Telegram = {
  WebApp: TelegramWebApp;
  WebView: WebView;
  Utils: Utils;
};
