import { toggleRenderMode } from "~/redux/actions/session"

export default {
  key: 82, // r key
  throttle: 500,
  invoke: () => {
    toggleRenderMode()
  }
};
