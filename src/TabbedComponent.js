import {Component, h} from 'preact';
import cn from 'classnames';
import {API_ENDPOINT, API_KEY, SECTIONS} from './consts.json';

import moment from 'moment'

import {urlBuilder} from './helpers.js'

import './TabbedComponent.css';

class TabbedComponent extends Component {
	constructor(props) {
		super(props);
		this.state =  {
			activeTab: SECTIONS[0].key,
			results: {}
		};

		console.log(this.state);
		this.switchSection = this.switchSection.bind(this);
		SECTIONS.forEach(sec => {
			this.state.results[sec.key] = []
		});
	}

	switchSection(section, e) {
		//most basic of cache check
		console.log(this.state)
		if (!this.state.results[section].length)  {
			this.getSectionResults(section);
		}

		this.setState({
			activeTab: section
		});
	}

	async getSectionResults(section) {
		let res = await fetch(urlBuilder(API_ENDPOINT, {
				api_key: API_KEY,
				section: section
			}
		)),
			json = await res.json(), 
			response = json && json.response || {}, results;

			console.log(response)
			results = response.results || [];
			console.log(results)

			let changes = {
				results: {...this.state.results}
			};

			changes.results[section] = results;
			
			this.setState(changes);
	}

	async componentDidMount() {
		await this.getSectionResults(this.state.activeTab);
	}

	render(props, {activeTab, results}) {

		let articles = results[activeTab] || [];

		return (<div class="tabbed-component">
			<div class="tabbed-component__tabs">
				{SECTIONS.map((section) => {
					return <span class={cn('tabbed-component__tab', {'active': activeTab == section.key})} onClick={this.switchSection.bind(this, section.key)}>{section.label}</span>
				})}
			</div>
			<ol class={cn('tabbed-component__content')}>
				{articles.map(({webTitle, webUrl, webPublicationDate}) => {
					let momentDate = moment(webPublicationDate);
					return (<li class="tabbed-component__article">
							<a class="tabbed-component__article__link" href={webUrl}>
							<h3 class="tabbed-component__article__link__title">{webTitle}</h3>
								<span class="tabbed-component__article__timestamp" title={momentDate.format('MMMM Do YYYY, H:mm')}>{momentDate.fromNow()}</span>
							</a>
						</li>);
				})}
			</ol>
		</div>)
	}
}

export default TabbedComponent;