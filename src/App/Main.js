import {
  showConnections,
  hideConnections,
  updateInput,
} from 'actions/actionCreators';
import axios from 'axios';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: { GlobalStyles, Panel, Switch, Tooltip, TextField, Button },
  utilities: {
    confirm,
    onceConfirmAnswer,
    rpcCall,
    onceRpcReturn,
    showErrorDialog,
    showSuccessDialog,
  },
} = NEXUS;

const newId = (() => {
  let id = 0;
  return () => ++id;
})();

const DemoTextField = styled(TextField)({
  maxWidth: 400,
});

@connect(
  state => ({
    coreInfo: state.coreInfo,
    showingConnections: state.settings.showingConnections,
    inputValue: state.ui.inputValue,
  }),
  { showConnections, hideConnections, updateInput }
)
class Main extends React.Component {
  confirmToggle = () => {
    const { showingConnections, showConnections, hideConnections } = this.props;
    const question = showingConnections
      ? 'Hide number of connections?'
      : 'Show number of connections?';
    const confirmationId = newId();
    onceConfirmAnswer(agreed => {
      if (agreed) {
        if (showingConnections) {
          hideConnections();
        } else {
          showConnections();
        }
      }
    }, confirmationId);

    confirm({ confirmationId, question });
  };

  handleChange = e => {
    this.props.updateInput(e.target.value);
  };

  getDifficulty = () => {
    const callId = newId();
    onceRpcReturn((err, response) => {
      if (err) {
        showErrorDialog({
          message: 'Cannot get difficulty',
        });
      } else {
        showSuccessDialog({
          message: 'Mining difficulty',
          note: JSON.stringify(response, null, 2),
        });
      }
    }, callId);

    rpcCall({
      command: 'getdifficulty',
      params: [[]],
      callId,
    });
  };

  render() {
    const { coreInfo, showingConnections, inputValue } = this.props;
    return (
      <Panel
        title="React Module Example"
        icon={{ url: 'react.svg', id: 'icon' }}
      >
        <GlobalStyles />
        <div>
          This showcases how a Nexus Wallet Modules can interact with the base
          wallet.
        </div>

        <div className="mt2 flex center">
          Show number of connections&nbsp;&nbsp;
          <Tooltip.Trigger
            position="right"
            tooltip="This setting will be remembered even when the wallet is restarted"
          >
            <Switch
              checked={showingConnections}
              onChange={this.confirmToggle}
            />
          </Tooltip.Trigger>
        </div>
        {!!showingConnections && <div>Connections: {coreInfo.connections}</div>}

        <div className="mt2">
          <div>
            This textbox's content will be remembered even when you navigate
            away from this module
          </div>
          <DemoTextField
            value={inputValue}
            onChange={this.handleChange}
            placeholder="Type anything here"
          />
        </div>

        <div className="mt2">
          <Button onClick={this.getDifficulty}>View mining difficulty</Button>
        </div>
      </Panel>
    );
  }
}

export default Main;
