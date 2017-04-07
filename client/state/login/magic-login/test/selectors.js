/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	emailAddressFormInput,
	emailAddressFormInputIsValid,
	//@TODO	isFetchingAuth,
	isFetchingEmail,
	isShowingRequestForm,
	isShowingInterstitialPage,
	isShowingExpiredPage,
	isShowingCheckYourEmailPage,
	//@TODO requestAuthError,
	//@TODO requestAuthStatus,
	requestEmailError,
	requestedEmailSuccessfully,
} from '../selectors';

describe( 'selectors', () => {
	describe( 'emailAddressFormInput()', () => {
		it( 'should return empty string by default', () => {
			const val = emailAddressFormInput( undefined );
			expect( val ).to.equal( '' );
		} );

		it( 'should return empty string on empty string', () => {
			const val = emailAddressFormInput( '' );
			expect( val ).to.equal( '' );
		} );

		it( 'should return string value', () => {
			const val = emailAddressFormInput( {
				login: {
					magicLogin: {
						emailAddressFormInput: 'robertantonwilson@example.com'
					},
				},
			} );
			expect( val ).to.equal( 'robertantonwilson@example.com' );
		} );
	} );

	describe( 'emailAddressFormInputIsValid()', () => {
		it( 'should return false if there is no input yet', () => {
			const isValid = emailAddressFormInputIsValid( undefined );
			expect( isValid ).to.be.false;
		} );

		it( 'should return false if input is not an email address', () => {
			const isValid = emailAddressFormInputIsValid( {
				login: {
					magicLogin: {
						emailAddressFormInput: 'robertantonwilson@example.',
						emailAddressFormInputIsValid: false,
					},
				},
			} );
			expect( isValid ).to.be.false;
		} );

		it( 'should return true if input is an email address', () => {
			const isValid = emailAddressFormInputIsValid( {
				login: {
					magicLogin: {
						emailAddressFormInput: 'robertantonwilson@example.com',
						emailAddressFormInputIsValid: true,
					},
				},
			} );
			expect( isValid ).to.be.true;
		} );
	} );

	describe( 'isFetchingEmail()', () => {
		it( 'should return false if there is no fetching information yet', () => {
			const isFetching = isFetchingEmail( undefined );
			expect( isFetching ).to.be.false;
		} );

		it( 'should return true if client is requesting an email', () => {
			const isFetching = isFetchingEmail( {
				login: {
					magicLogin: {
						isFetchingEmail: true,
					},
				},
			} );
			expect( isFetching ).to.be.true;
		} );

		it( 'should return false when finished requesting an email', () => {
			const isFetching = isFetchingEmail( {
				login: {
					magicLogin: {
						isFetchingEmail: false,
					},
				},
			} );
			expect( isFetching ).to.be.false;
		} );
	} );

	describe( 'isShowingRequestForm()', () => {
		it( 'should return false if there is no information yet', () => {
			const isShowing = isShowingRequestForm( undefined );
			expect( isShowing ).to.be.false;
		} );

		it( 'should return false if not showing', () => {
			const isShowing = isShowingRequestForm( {
				login: {
					magicLogin: {
						isShowingRequestForm: false,
					},
				},
			} );
			expect( isShowing ).to.be.false;
		} );

		it( 'should return true if showing', () => {
			const isShowing = isShowingRequestForm( {
				login: {
					magicLogin: {
						isShowingRequestForm: true,
					},
				},
			} );
			expect( isShowing ).to.be.true;
		} );
	} );

	describe( 'isShowingInterstitialPage()', () => {
		it( 'should return false if there is no information yet', () => {
			const isShowing = isShowingInterstitialPage( undefined );
			expect( isShowing ).to.be.false;
		} );

		it( 'should return false if not showing', () => {
			const isShowing = isShowingInterstitialPage( {
				login: {
					magicLogin: {
						isShowingInterstitialPage: false,
					},
				},
			} );
			expect( isShowing ).to.be.false;
		} );

		it( 'should return true if showing', () => {
			const isShowing = isShowingInterstitialPage( {
				login: {
					magicLogin: {
						isShowingInterstitialPage: true,
					},
				},
			} );
			expect( isShowing ).to.be.true;
		} );
	} );

	describe( 'isShowingExpiredPage()', () => {
		it( 'should return false if there is no information yet', () => {
			const isShowing = isShowingExpiredPage( undefined );
			expect( isShowing ).to.be.false;
		} );

		it( 'should return false if not showing', () => {
			const isShowing = isShowingExpiredPage( {
				login: {
					magicLogin: {
						isShowingExpiredPage: false,
					},
				},
			} );
			expect( isShowing ).to.be.false;
		} );

		it( 'should return true if showing', () => {
			const isShowing = isShowingExpiredPage( {
				login: {
					magicLogin: {
						isShowingExpiredPage: true,
					},
				},
			} );
			expect( isShowing ).to.be.true;
		} );
	} );

	describe( 'isShowingCheckYourEmailPage()', () => {
		it( 'should return false if there is no information yet', () => {
			const isShowing = isShowingCheckYourEmailPage( undefined );
			expect( isShowing ).to.be.false;
		} );

		it( 'should return false if not showing', () => {
			const isShowing = isShowingCheckYourEmailPage( {
				login: {
					magicLogin: {
						isShowingCheckYourEmailPage: false,
					},
				},
			} );
			expect( isShowing ).to.be.false;
		} );

		it( 'should return true if showing', () => {
			const isShowing = isShowingCheckYourEmailPage( {
				login: {
					magicLogin: {
						isShowingCheckYourEmailPage: true,
					},
				},
			} );
			expect( isShowing ).to.be.true;
		} );
	} );

	describe( 'requestEmailError()', () => {
		it( 'should return null if there is no information yet', () => {
			const error = requestEmailError( undefined );
			expect( error ).to.be.null;
		} );

		it( 'should return null if there is no information yet', () => {
			const error = requestEmailError( {
				login: {
					magicLogin: {
						requestEmailError: 'to err is human',
					},
				},
			} );
			expect( error ).to.equal( 'to err is human' );
		} );

		it( 'should return null when set to null', () => {
			const error = requestEmailError( {
				login: {
					magicLogin: {
						requestEmailError: null,
					},
				},
			} );
			expect( error ).to.be.null;
		} );
	} );

	describe( 'requestedEmailSuccessfully()', () => {
		it( 'should return false if there is no information yet', () => {
			const requested = requestedEmailSuccessfully( undefined );
			expect( requested ).to.be.false;
		} );

		it( 'should return true if true', () => {
			const requested = requestedEmailSuccessfully( {
				login: {
					magicLogin: {
						// @TODO include other pages once reducers are merged
						isShowingRequestForm: true,
						requestEmailSuccess: true,
					},
				},
			} );
			expect( requested ).to.be.true;
		} );

		it( 'should return false if false', () => {
			const requested = requestedEmailSuccessfully( {
				login: {
					magicLogin: {
						requestEmailSuccess: false,
					},
				},
			} );
			expect( requested ).to.be.false;
		} );
	} );
} );
