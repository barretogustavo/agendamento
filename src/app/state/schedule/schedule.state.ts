import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Schedules } from "src/app/models";

export class StoreSchedule {
  static readonly type = "[Schedules] Store";
  constructor(public payload: Schedules) {}
}

export class ClearSchedule {
  static readonly type = "[Schedules] Clear";
}

export class UpdateSchedule {
  static readonly type = "[Schedules] Update";
  constructor(public payload: Schedules) {}
}

@State<Schedules | null>({
  name: "schedules",
  defaults: null,
})
@Injectable()
export class ScheduleState {
  @Selector()
  static getSchedule(state: Schedules | null) {
    return state;
  }

  @Action(StoreSchedule)
  storeSchedule(ctx: StateContext<Schedules | null>, { payload }: StoreSchedule) {
    ctx.setState(payload);
  }

  @Action(ClearSchedule)
  clearSchedule(ctx: StateContext<Schedules | null>) {
    ctx.setState(null);
  }

  @Action(UpdateSchedule)
  updateSchedule(ctx: StateContext<Schedules | null>, { payload }: UpdateSchedule) {
    const state = ctx.getState();
    if (state !== null && state.id === payload.id) {
      ctx.setState(payload);
    }
  }
}
