// src/utils/cn.js

function cn(...args) {
  return args.filter(Boolean).join(' ');
}

export { cn }; 