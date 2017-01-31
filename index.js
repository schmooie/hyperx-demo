const hyperx = require('hyperx');
const React = require('react');
const ReactDOM = require('react-dom');

// the deliverable?
function makeFoo(context) {
  let h;

  if (context === 'react') {
    h = hyperx(React.createElement);
  } else if (context === 'angular') {
    // do hyperscript/vdom stuff for angular
    // or whatever framework
  }

  return (props) => {
    return h`
      <div>
        <h1>Times clicked: ${props.timesClicked}</h1>
        <button onClick=${props.onButtonClick}>Click Me</button>
      </div>
    `;
  };
}


// parent app stuff
const Foo = makeFoo('react');
const parentAppState = { timesClicked: 0 };

function renderFooComponent() {
  ReactDOM.render(React.createElement(Foo, {
    timesClicked: parentAppState.timesClicked,
    onButtonClick: () => {
      parentAppState.timesClicked ++;
      renderFooComponent();
    },
  }), document.querySelector('#foo'));
}

renderFooComponent();