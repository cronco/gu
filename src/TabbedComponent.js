import {Component, h} from 'preact';
import cn from 'classnames';
import {API_ENDPOINT, API_KEY, SECTIONS} from './consts.json';

import {urlBuilder} from './helpers.js'

import './TabbedComponent.css';

class TabbedComponent extends Component {
	constructor(props) {
		super(props);
		this.state =  {
			activeTab: SECTIONS[0].key,
			results: {}
		};

		SECTIONS.forEach(sec => this.state.results[sec.key] = []);
		console.log(this.state);
	}

	async componentDidMount() {
		let res = await fetch(urlBuilder(API_ENDPOINT, {
				api_key: API_KEY,
				section: this.state.activeTab
			}
		)),
			json = await res.json(), 
			response = json && json.response || {}, results;

			console.log(response)
			results = response.results || [];
			console.log(results)

			let changes = {
				results: {}
			};

			changes.results[this.state.activeTab] = results;
			
			this.setState(changes, () => {
				console.log('got results', this.state)
			})
	}

	render(props, {activeTab, results}) {
		return <div class="tabbed-component">
			{SECTIONS.map((section) => {
				return <span class={cn('tabbed-component__tab', {'active-tab': activeTab == section.key})}>{section.label}</span>
			})}
			<div class={cn('tabbed-component__content')}>
				{results[activeTab].map(({webTitle, webUrl, webPublicationDate}) => {
					return (<div class="tabbed-component__article"><a href={webUrl}>{webTitle}</a></div>);
				})}
			</div>
		</div>
	}
}

export default TabbedComponent;