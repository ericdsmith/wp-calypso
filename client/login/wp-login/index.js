/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import config from 'config';
import {
	showRequestForm as showMagicLoginRequestForm,
} from 'state/login/magic-login/actions';
import {
	emailAddressFormInput,
	isShowingRequestForm as isShowingMagicLoginRequestForm,
	isShowingExpiredPage as isShowingMagicLoginExpiredPage,
	isShowingCheckYourEmailPage,
} from 'state/login/magic-login/selectors';
import { getCurrentQueryArguments } from 'state/ui/selectors';
import Gridicon from 'gridicons';
import Main from 'components/main';
import LoginBlock from 'blocks/login';
import RequestLoginEmailForm from '../magic-login/request-login-email-form';
import HandleEmailedLinkForm from '../magic-login/handle-emailed-link-form';
import EmailedLoginLinkSuccessfully from '../magic-login/emailed-login-link-successfully';
import EmailedLoginLinkExpired from '../magic-login/emailed-login-link-expired';
import { isEnabled } from 'config';
import { localize } from 'i18n-calypso';

class Login extends React.Component {
	magicLoginMainContent() {
		const {
			handlingMagicLink,
			magicLoginEmailAddress,
			showingCheckYourEmailPage,
			showingMagicLoginExpiredPage,
		} = this.props;

		if ( showingMagicLoginExpiredPage ) {
			return <EmailedLoginLinkExpired />;
		}

		if ( showingCheckYourEmailPage ) {
			return <EmailedLoginLinkSuccessfully emailAddress={ magicLoginEmailAddress } />;
		}

		if ( handlingMagicLink ) {
			return <HandleEmailedLinkForm />;
		}
	}

	goBack( event ) {
		event.preventDefault();

		if ( typeof window !== 'undefined' ) {
			window.history.back();
		}
	}

	footerContent() {
		const {
			handlingMagicLink,
			showingCheckYourEmailPage,
			showingMagicLoginRequestForm,
			translate,
		} = this.props;
		let loginLink;

		if ( ! (
			handlingMagicLink ||
			showingCheckYourEmailPage ||
			showingMagicLoginRequestForm
		) ) {
			loginLink = <a href="#" onClick={ this.props.onMagicLoginRequestClick }>{ translate( 'Email me a login link' ) }</a>;
		}

		return (
			<div className="wp-login__footer">
				{ loginLink }
				<a href={ config( 'login_url' ) + '?action=lostpassword' }>{ this.props.translate( 'Lost your password?' ) }</a>
				<a href="#" onClick={ this.goBack }><Gridicon icon="arrow-left" size={ 18 } /> { this.props.translate( 'Back' ) }</a>
			</div>
		);
	}

	render() {
		const {
			showingMagicLoginRequestForm,
			translate,
		} = this.props;

		return (
			<Main className="wp-login">
				{ this.magicLoginMainContent() || (
					<div>
						<div className="wp-login__container">
							{ showingMagicLoginRequestForm
								? <RequestLoginEmailForm />
								: <LoginBlock title={ translate( 'Log in to your account' ) } />
							}
						</div>
						{ this.footerContent() }
					</div>
				) }
			</Main>
		);
	}
}

const mapState = state => {
	const magicLoginEnabled = isEnabled( 'magic-login' );
	const queryArguments = getCurrentQueryArguments( state );

	const {
		action,
		client_id: clientId,
		email,
		token,
		tt: tokenTime,
	} = queryArguments;

	return {
		handlingMagicLink: (
			magicLoginEnabled &&
			action === 'handleLoginEmail' &&
			clientId &&
			email &&
			token &&
			tokenTime
		),
		magicLoginEmailAddress: emailAddressFormInput( state ),
		showingMagicLoginExpiredPage: magicLoginEnabled && isShowingMagicLoginExpiredPage( state ),
		showingMagicLoginRequestForm: magicLoginEnabled && isShowingMagicLoginRequestForm( state ),
		showingCheckYourEmailPage: magicLoginEnabled && isShowingCheckYourEmailPage( state ),
	};
};

const mapDispatch = dispatch => {
	return {
		onMagicLoginRequestClick: event => {
			event.preventDefault();
			dispatch( showMagicLoginRequestForm() );
		}
	};
};

export default connect( mapState, mapDispatch )( localize( Login ) );
