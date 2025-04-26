import { JSX } from 'react';
import classes from './OverlayView.module.css';

export function OverlayView(props: { isVisible: boolean }): JSX.Element {
  if (!props.isVisible) {
    return <></>;
  } else {
    return <div className={classes.layout}></div>;
  }
}
