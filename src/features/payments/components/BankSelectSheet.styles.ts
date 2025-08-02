export const overlayStyleMap = {
  base: 'fixed inset-0 bg-black/30 z-10 transition-opacity duration-300',
  open: 'opacity-100',
  closed: 'opacity-0 pointer-events-none',
};

export const sheetStyleMap = {
  base: 'fixed left-0 right-0 bottom-14 z-20 bg-white/90 rounded-t-2xl p-6 flex flex-col items-center min-h-[320px] transition-transform duration-300',
  open: 'translate-y-0',
  closed: 'translate-y-full',
};

export const dragHandleStyleMap = {
  base: 'w-12 h-1.5 bg-gray-300 rounded-full mb-6 cursor-pointer',
};

export const bankGridStyleMap = {
  base: 'grid grid-cols-3 gap-4 w-full max-w-[375px]',
};

export const bankButtonStyleMap = {
  base: 'flex flex-col items-center justify-center h-20 rounded-xl bg-gray-100 hover:bg-gray-200 transition',
};

export const bankImageStyleMap = {
  base: 'size-10 rounded-full mb-2 object-contain bg-white',
};

export const bankLabelStyleMap = {
  base: 'text-gray-800 text-sm font-semibold',
};
