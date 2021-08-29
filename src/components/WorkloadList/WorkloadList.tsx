import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootAction, RootState } from '../../state';
import { cancel, checkStatus } from '../../state/workloads/actions';
import { WorkloadItem, WorkloadItemStateProps } from '../WorkloadItem';


export interface WorkloadListStateProps {
  workloads: WorkloadItemStateProps[];
}

export interface WorkloadListDispatchProps {
  cancelWorkload: (id: number) => void;
  checkStatusWorkload: (id: number) => void;
}

export interface WorkloadListProps extends
  WorkloadListStateProps,
  WorkloadListDispatchProps { }


const WorkloadList: React.SFC<WorkloadListProps> = React.memo(({ workloads, cancelWorkload, checkStatusWorkload }) => {
  const index = workloads.length - 1
  if (index > -1) {
    setTimeout(() => checkStatusWorkload(workloads[index].id), workloads[index].complexity * 1000)
  }
  return (
    !workloads.length
      ? (
        <span>No workloads to display</span>
      )
      : (
        <ol>
          {workloads.map((workload) => (
            <li key={workload.id}>
              <WorkloadItem {...workload} onCancel={() => cancelWorkload(workload.id)} />
            </li>
          ))}
        </ol>
      )
  )
}, (prevProps, nextProps) => {
  let isUpdated = true;
  if (nextProps.workloads.length !== prevProps.workloads.length) return false;
  nextProps.workloads.length && nextProps.workloads.forEach((workload, index) => {
    if (prevProps.workloads.length && prevProps.workloads[index].status !== workload.status) {
      isUpdated = false
    }
  });
  return isUpdated;
});


const mapStateToProps = (state: RootState): WorkloadListStateProps => ({
  workloads: Object.values(state.workloads),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): WorkloadListDispatchProps => ({
  cancelWorkload: (id: number) => dispatch(cancel({ id })),
  checkStatusWorkload: (id: number) => dispatch(checkStatus({ id }))
})

const WorkloadListContainer = connect(mapStateToProps, mapDispatchToProps)(WorkloadList);


export {
  WorkloadList,
  WorkloadListContainer,
};

export default WorkloadList;
