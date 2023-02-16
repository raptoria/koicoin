import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
    --primary-color: #db6a30;
    --secondary-color: #ff5722;
    --neutral-color: #d1d1d1;
    --neutral2-color: #fff;
    --neutral3-color: rgb(135, 135, 135);
    --linebreak-color: #4d4d4d;
    --primary-background: #444444;
    --secondary-background: #565656;
    --tertiary-background: #5f5c5c;
    --quaternary-background: #3d3b3b;
    --header-height: 56px;
    --spacing-lg: 3rem;
    --spacing-md: 2rem;
    --spacing-sm: 1rem;
  }

  .inputIcon {
    color: var(--neutral-color);
    margin-right: 0.1rem;
  }
  
  .ant-form-item-label {
    text-align: left;
    width: 100%;
  }
  
  .ant-input-affix-wrapper, .ant-input,
  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper, .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
    color: var(--neutral-color);
    background: var(--secondary-background);
    border: none;
  }
  
  .ant-input::placeholder {
    color: var(--neutral3-color);
  }
  
  .ant-btn-primary {
    background: var(--primary-color);
    border-color: var(--secondary-color);
    width: 100%;
  }
  
  .ant-btn:not([disabled]):hover {
    filter: brightness(110%);
  }
  
  .ant-btn[disabled]:hover {
    background: var(--primary-color);
    border: none;
  }

 h3 {
        color: var(--neutral-color);
        margin-bottom: var(--spacing-lg);
  }

  hr {
    border: 1px solid var(--linebreak-color);
    margin-bottom: 2rem;
  }

  img.logo {
    transition: all 0.3s ease-in-out 0s;
    filter: drop-shadow(0px 5px 5px #3a3939);
  }

  img.logo:hover {
    cursor: default;
    transform: scaleX(-1);
    transition: all 0.3s ease-in-out 0s;
  }

  h1 {
    color: var(--neutral-color);
    letter-spacing: 2px;
    span {
      color: var(--primary-color);
    }
    margin: var(--spacing-sm) 0;
  }

  .form {
    width: 20rem;
    text-align: center;
  }

    header {
      grid-column: span 2;
      margin-bottom: var(--spacing-md);
    }

    .loadingIndicator {
      position: absolute;
      bottom: 50%;
      left: 50%;
      z-index: 1;
    }

    .ant-alert-message,
    .ant-alert-error .ant-alert-icon {
      color: #ffd7ca;
    }

    .firstColumn {
      margin: 0 var(--spacing-md);
    }

    a {
      color: #ffe6da;
      text-decoration: underline;
    }

    a:hover {
      color: var(--neutral2-color);
    }

    .secondColumn {
      margin-right: var(--spacing-md);

      .ant-card {
        height: 100%;

        &.graphCard {
          .ant-card-body {
            color: black;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }

    .ant-alert-error {
      background-color: #f44336;
      border: 1px solid #ea3729;
    }

    .ant-empty-normal {
      color: #ffffffa3;
      margin: 0;
    }

    .ant-page-header-heading-sub-title {
      color: var(--neutral2-color);
      font-size: var(--spacing-sm);
      margin-left: var(--spacing-sm);
      letter-spacing: 2px;
    }
    .ant-page-header {
      background: var(--primary-color);
      padding: 0.6rem 1.5rem;
    }

    .ant-page-header-heading .ant-avatar {
      margin-right: 0;
    }

    .ant-page-header-heading-extra {
      display: flex;
      align-items: center;
      color: var(--neutral2-color);

      .extraAvatar {
        background: #c76330;
        margin-right: 0.5rem;
      }

      span {
        margin-right: var(--spacing-md);
      }
    }

    .ant-card-head {
      color: var(--neutral-color);
      background: var(--secondary-background);
      border-bottom: 1px solid var(--linebreak-color);
    }

    .ant-card-body {
      color: var(--neutral-color);
      background: var(--primary-background);
      height: 100%;
    }

    .ant-card {
      text-align: center;
      margin-bottom: var(--spacing-md);
    }
  }

@media all and (max-width: 500px) {
    .login {
      padding-top: var(--spacing-sm);
      align-items: start;
    }
  }
`;

export default GlobalStyle;
