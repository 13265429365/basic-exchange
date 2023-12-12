// LayoutsDesktopPath 桌面端布局文件
export const LayoutsDesktopPath = (name: string): string => {
  return 'layouts/desktop/' + name;
};

// LayoutsMobilePath 手机端布局文件
export const LayoutsMobilePath = (name: string): string => {
  return 'layouts/mobile/' + name;
};

// PagesTemplateDesktopPath 桌面端页面文件
export const PagesTemplateDesktopPath = (
  name: string
): string => {
  return '../pages/desktop/' + name;
};

// PagesTemplateMobilePath 手机端页面文件
export const PagesTemplateMobilePath = (
  name: string
): string => {
  return '../pages/mobile/' + name;
};
