import {h, render} from 'preact';
import TabbedComponent from './TabbedComponent';


render((<div id='tabbed-component-test'>
		<TabbedComponent />
	</div>), document.body, document.body.lastChild)
console.log('are we rolling?');
