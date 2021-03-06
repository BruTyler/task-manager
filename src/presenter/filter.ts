import FilterView from '../view/filter';
import TasksModel from '../model/tasks';
import FilterModel from '../model/filter';
import {render, replace, remove} from '../utils/render';
import {filter} from '../utils/filter';
import {FilterType, UpdateType, RenderPosition} from '../const';
import {Filter as IFilter} from '../types';

export default class Filter {
  private _filterContainer: HTMLElement
  private _filterModel: FilterModel
  private _tasksModel: TasksModel
  private _currentFilter: FilterType | null
  private _filterComponent: FilterView | null

  constructor(filterContainer: HTMLElement, filterModel: FilterModel, tasksModel: TasksModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._tasksModel = tasksModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._tasksModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init(): void {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent(): void {
    this.init();
  }

  _handleFilterTypeChange(filterType: FilterType): void {
    if (this._currentFilter === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters(): IFilter[] {
    const tasks = this._tasksModel.getTasks();

    return [
      {
        type: FilterType.ALL,
        title: `All`,
        count: filter[FilterType.ALL](tasks).length
      },
      {
        type: FilterType.OVERDUE,
        title: `Overdue`,
        count: filter[FilterType.OVERDUE](tasks).length
      },
      {
        type: FilterType.TODAY,
        title: `Today`,
        count: filter[FilterType.TODAY](tasks).length
      },
      {
        type: FilterType.FAVORITES,
        title: `Favorites`,
        count: filter[FilterType.FAVORITES](tasks).length
      },
      {
        type: FilterType.REPEATING,
        title: `Repeating`,
        count: filter[FilterType.REPEATING](tasks).length
      },
      {
        type: FilterType.ARCHIVE,
        title: `Archive`,
        count: filter[FilterType.ARCHIVE](tasks).length
      }
    ];
  }
}
