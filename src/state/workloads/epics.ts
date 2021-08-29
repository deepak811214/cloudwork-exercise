import { combineEpics, Epic } from "redux-observable";
import { filter, map, tap, ignoreElements, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { RootAction, RootState } from "../reducer";
import * as workloadsActions from "./actions";
import { WorkloadService } from "./services";
import { from } from "rxjs";

type AppEpic = Epic<RootAction, RootAction, RootState>;
const workloadService = new WorkloadService()

const logWorkloadSubmissions: AppEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(workloadsActions.submit)),
    switchMap((action) => from(workloadService.create(action.payload)).pipe()),
    map((payload) => workloadsActions.created(payload))
  );


const cancelWorkload: AppEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(workloadsActions.cancel)),
    switchMap((action) => from(workloadService.cancel(action.payload))),
    map((payload) => workloadsActions.updateStatus(payload))
  );

const updateStatusWorkload: AppEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(workloadsActions.checkStatus)),
    switchMap((action) => from(workloadService.checkStatus(action.payload))),
    map((payload) => workloadsActions.updateStatus(payload)),
  );

export const epics = combineEpics(logWorkloadSubmissions, cancelWorkload, updateStatusWorkload);

export default epics;
