import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const Toast = styled(ToastContainer)`
  .Toastify__toast--info {
    background: rgb(51, 102, 255);
    color: white;
    path {
      fill: white;
    }
    .Toastify__progress-bar {
      background: white;
    }
  }

  .Toastify__toast--success {
    background: rgb(51, 187, 102);
    color: white;
    path {
      fill: white;
    }
    .Toastify__progress-bar {
      background: white;
    }
  }

  .Toastify__toast--warning {
    background: rgb(254, 255, 20);
    color: white;
    path {
      fill: white;
    }
    .Toastify__progress-bar {
      background: white;
    }
  }

  .Toastify__toast--error {
    background: rgb(255, 102, 102);
    color: white;
    path {
      fill: white;
    }
    .Toastify__progress-bar {
      background: white;
    }
  }
`;
