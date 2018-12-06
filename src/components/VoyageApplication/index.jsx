import * as React from 'react';
import newUserApplicationData from './newUserApplication.data.js';
import './VoyageApplication.css';
import '../FormCreator/FormCreator.css';
import voyageApplicationData from './VoyageApplication.data.js';
import { renderQAs } from '../FormCreator/answerCreators.js';
import Error from '../Error/Error';
import Loading from '../Loader/Loader';
import SuccessForm from '../Success/Success';
import Store from '../../AppGlobalStore.js';
import { submitApplication } from './graphql/mutations';

const newUserPage1 = newUserApplicationData.filter((data) => { return data.page === 1 });
const newUserPage2 = newUserApplicationData.filter((data) => { return data.page === 2 });
const newUserPage3 = newUserApplicationData.filter((data) => { return data.page === 3 });
const voyageApplicationPage1 = voyageApplicationData.filter((data) => { return data.page === 1 });
const voyageApplicationPage2 = voyageApplicationData.filter((data) => { return data.page === 2 });

const newUserApplication = [newUserPage1, newUserPage2, newUserPage3, voyageApplicationPage1, voyageApplicationPage2];
const voyageApplication = [voyageApplicationPage1, voyageApplicationPage2]

class VoyageApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      loading: false,
      error: false,
      errorMessage: '',
      success: false,
      applicationTitle: 'Voyage Application',
      application: voyageApplication,
      gql: '',
      progressBar: { width: '1%' },
      currentPage: 0,
      1: new Set(),
      4: '',
      5: new Set(),
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
      11: '',
      12: '',
      13: '',
      100: '',
      101: new Set(),
      102: '',
      103: '',
      104: '',
      105: '',
    }
  }

  componentDidMount() {
    this.setState({ id: this.props.match.params.id || 1 })

    // as an example, set to new user voyage application
    this.setState({
      application: newUserApplication,
      gql: 'SUBMIT_NEW_USER_VOYAGE_APPLICATION',
      applicationTitle: 'New User Application'
    }, () => {
      let progress = (1 / this.state.application.length) * 100 + '%';
      this.setState({ progressBar: { width: progress } });
    });
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading })
  }

  errorHandling = (err) => {
    this.setState({ error: true, errorMessage: err })
  }

  toggleValueInSet = (set, value) => {
    set.has(value) ? set.delete(value) : set.add(value);
    return set;
  }

  onFormChange = (e) => {
    const { name, value, type } = e.currentTarget;
    switch (type) {
      case 'checkbox':
        this.setState({ [name]: this.toggleValueInSet(this.state[name], value) });
        break;
      default:
        this.setState({ [name]: value });
        break;
    }
  }

  goBackAPage = (e) => {
    e.preventDefault();
    this.setState({ currentPage: this.state.currentPage - 1 }, () => {
      let progress = this.state.currentPage === 0
        ? (1 / this.state.application.length) * 100 + '%'
        : ((this.state.currentPage - 1) / this.state.application.length) * 100 + '%'
      this.setState({ progressBar: { width: progress } })
    });
  }

  goToNextPage = (e) => {
    e.preventDefault();
    this.setState({ currentPage: this.state.currentPage + 1 }, () => {
      let progress = this.state.currentPage === this.state.application.length - 1
        ? '100%'
        : ((this.state.currentPage + 1) / this.state.application.length) * 100 + '%'
      this.setState({ progressBar: { width: progress } })
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const new_voyage_user_form = {
      cohort_role: this.state[1],
      location_on_coding_journey: this.state[4],
      familiar_tech_stacks: this.state[5],
      commitment_to_goals: this.state[6],
      showcase_project_link: this.state[7],
      gender: this.state[8],
      personal_background: this.state[9],
      coding_history: this.state[10],
      personal_interest: this.state[11],
      best_dinner_guest: this.state[12],
      greatest_accomplishment: this.state[13],
    }
    const voyage_form = {
      voyage_id: this.state.id,
      hours_per_week: this.state[100],
      preferred_tech_stack: this.state[101],
      voice_chat_preference: this.state[102],
      pm_preference: this.state[103],
      tier_level: this.state[104],
      time_of_day_available: this.state[105],
    }

    Store.mutations.submitApplication(
      this.toggleLoading,
      this.errorHandling,
      this.state.applicationTitle !== 'New User Application' ? { voyage_form } : { voyage_form, new_voyage_user_form },
      submitApplication
    )
      .then(() => {
        if (this.state.error === false) {
          return this.setState({ success: true });
        }
      })
  }

  render() {
    let { loading, applicationTitle, errorMessage, success, progressBar, application, currentPage } = this.state;
    return (
      <React.Fragment>
        {loading ? <Loading /> : null}
        {errorMessage !== "" ? <Error goBack={"/voyage/application/1"} error={errorMessage} /> : null}
        <div className="voyage-application-container">
          <div className="voyage-application-title">Voyage Application</div>
          <div className="voyage-application">
            {
              success
              ? <SuccessForm />
              : <React.Fragment>
                <div className="voyage-application-subtitle">
                  {applicationTitle}
                </div>
                {applicationTitle === 'New User Application' && <NoticeToUsers />}
                <div className="voyage-application-progress">
                  <div className="voyage-application-progress-bar" style={progressBar} />
                </div>
                {renderQAs(application[currentPage], this.onFormChange, this.state)}
                <hr className="hline" />
                <div className="voyage-application-btn-container">
                  {
                    this.state.currentPage === 0
                      ? null
                      : <button className="voyage-appliation-btn--grey" onClick={e => this.goBackAPage(e)}>Previous</button>
                  }
                  {
                    this.state.currentPage === this.state.application.length - 1
                      ? <button className="voyage-appliation-btn--green" onClick={e => this.onSubmit(e)}>Submit</button>
                      : <button className="voyage-appliation-btn--green" onClick={e => this.goToNextPage(e)}>Next</button>
                  }
                </div>
              </React.Fragment>
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const NoticeToUsers = () => {
  return (
    <div className="new-user-application-notice">
      <div className="new-user-application-notice-title">A Notice to Users</div>
      <div className="new-user-application-notice-description">
        Does the application seem a little long to you? <br /> Don't worry! We promise all of your
        answers are critical to your placement in the voyage. Also, the New Users Application
        only pops up in your initial Voyage application.
      </div>
    </div>
  )
}

export default VoyageApplication;