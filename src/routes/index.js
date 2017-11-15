// Core
import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Switch } from 'react-router';

// Instrumnets
import pages from 'Routes/pages';
import uiActions from 'actions/ui';
import authActions from 'actions/auth';
import { getAuthenticated } from 'selectors/auth';
import { getInitialized } from 'selectors/ui';

// Routing
import Public from './Public';
import Private from './Private';

// Components
import Catcher from 'components/Catcher';
import Loading from 'components/Loading';

class Routes extends Component {
    static propTypes = {
        authenticated: bool.isRequired,
        history:       object.isRequired,
        initialize:    func.isRequired,
        initialized:   bool.isRequired,
        location:      object.isRequired,
        login:         func.isRequired
    };

    componentDidMount () {
        const { authenticated, history, location } = this.props;

        const token = localStorage.getItem('token');

        token ? this.props.login({ token }) : this.props.initialize();

        if (authenticated) {
            if (location.pathname === pages.profile) {
                return;
            }
            history.replace(pages.feed);
        }
    }

    componentWillReceiveProps ({
        authenticated,
        initialized,
        location,
        history
    }) {
        if (authenticated && !initialized) {
            this.props.initialize();
        }

        if (authenticated) {
            if (location.pathname === pages.login) {
                history.replace(pages.feed);
            }
        }
    }
    render () {
        const { authenticated, initialized } = this.props;

        return initialized ? (
            <Catcher>
                <Switch>
                    {!authenticated && <Public />}
                    <Private />
                </Switch>
            </Catcher>
        ) : (
            <Loading />
        );
    }
}

const mapStateToProps = ({ auth, ui }) => ({
    authenticated: getAuthenticated(auth),
    initialized:   getInitialized(ui)
});

const { login } = authActions;
const { initialize } = uiActions;

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ login, initialize }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
