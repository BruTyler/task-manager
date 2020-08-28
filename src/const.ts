export enum Color {
  BLACK = `black`,
  YELLOW = `yellow`,
  BLUE = `blue`,
  GREEN = `green`,
  PINK = `pink`,
}

export enum RenderPosition {
  AFTERBEGIN = `afterbegin`,
  BEFOREEND = `beforeend`
}

export enum SortType {
  DEFAULT = `DEFAULT`,
  DATE_UP = `DATE up`,
  DATE_DOWN = `DATE down`
}

export enum RepeatingDaysMap {
  mo = 0b1,
  tu = 0b10,
  we = 0b100,
  th = 0b1000,
  fr = 0b10000,
  sa = 0b100000,
  su = 0b1000000
}

export enum UserAction {
  UPDATE_TASK = `UPDATE_TASK`,
  ADD_TASK = `ADD_TASK`,
  DELETE_TASK = `DELETE_TASK`
}

export enum UpdateType {
  PATCH = `PATCH`,
  MINOR = `MINOR`,
  MAJOR = `MAJOR`
}

export enum TaskMode {
  DEFAULT = `DEFAULT`,
  EDITING = `EDITING`
}
