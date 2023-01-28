
export const formatter = (option) =>
  new Intl.DateTimeFormat(option.reg, option.param);

export const temp1 = (reg) => {
  return {
    reg: reg,
    param: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  }
}
  

