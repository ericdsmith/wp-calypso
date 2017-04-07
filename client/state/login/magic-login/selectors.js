/**
 * External dependencies
 */
import { get } from 'lodash';

export const isShowingRequestForm = state => get( state, 'login.magicLogin.isShowingRequestForm', false );
export const isShowingInterstitialPage = state => get( state, 'login.magicLogin.isShowingInterstitialPage', false );
export const isShowingExpiredPage = state => get( state, 'login.magicLogin.isShowingExpiredPage', false );
export const isShowingCheckYourEmailPage = state => get( state, 'login.magicLogin.isShowingCheckYourEmailPage', false );

export const isFetchingEmail = state => get( state, 'login.magicLogin.isFetchingEmail', false );
export const requestEmailError = state => get( state, 'login.magicLogin.requestEmailError', null );
export const requestedEmailSuccessfully = state => {
	// @TODO include the rest of the forms in the first test once reducers are merged
	return isShowingRequestForm( state ) && ! isFetchingEmail( state ) && ! requestEmailError( state );
};

export const isFetchingAuth = state => get( state, 'login.magicLogin.isFetchingAuth', true );
export const requestAuthError = state => get( state, 'login.magicLogin.requestAuthError', null );
export const requestAuthSuccess = state => get( state, 'login.magicLogin.requestAuthSuccess', null );

export const emailAddressFormInput = state => get( state, 'login.magicLogin.emailAddressFormInput', '' );
export const emailAddressFormInputIsValid = state => get( state, 'login.magicLogin.emailAddressFormInputIsValid', false );
