import QRCode from 'qrcode';

export interface QRCodeOptions {
  size?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export async function generateQRCodeDataURL(
  text: string,
  options: QRCodeOptions = {},
): Promise<string> {
  const defaultOptions = {
    width: options.size || 200,
    margin: options.margin || 2,
    color: {
      dark: options.color?.dark || '#000000',
      light: options.color?.light || '#FFFFFF',
    },
  };

  try {
    const dataURL = await QRCode.toDataURL(text, defaultOptions);
    return dataURL;
  } catch (error) {
    console.error('QR Code 생성 실패:', error);
    throw new Error('QR Code 생성에 실패했습니다.');
  }
}

export async function downloadQRCode(
  text: string,
  filename: string = 'qr-code.png',
  options: QRCodeOptions = {},
): Promise<void> {
  try {
    const dataURL = await generateQRCodeDataURL(text, options);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('QR Code 다운로드 실패:', error);
    throw new Error('QR Code 다운로드에 실패했습니다.');
  }
}
