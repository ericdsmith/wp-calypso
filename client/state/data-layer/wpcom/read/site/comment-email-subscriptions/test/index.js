/**
 * External Dependencies
 */
import { expect } from 'chai';
import { spy } from 'sinon';

/**
 * Internal Dependencies
 */
import {
	requestCommentEmailSubscription,
	receiveCommentEmailSubscription,
	receiveCommentEmailSubscriptionError,
} from '../';
import {
	subscribeToNewCommentEmail,
	unsubscribeToNewCommentEmail
} from 'state/reader/follows/actions';
import { http } from 'state/data-layer/wpcom-http/actions';

describe( 'comment-email-subscriptions', () => {
	describe( 'requestCommentEmailSubscription', () => {
		it( 'should dispatch an http request and call through next', () => {
			const dispatch = spy();
			const next = spy();
			const action = subscribeToNewCommentEmail( 1234 );
			requestCommentEmailSubscription( { dispatch }, action, next );
			expect( dispatch ).to.have.been.calledWith( http( {
				method: 'POST',
				path: '/read/site/1234/comment_email_subscriptions/new',
				body: {},
				apiVersion: '1.2',
				onSuccess: action,
				onFailure: action
			} ) );

			expect( next ).to.have.been.calledWith( action );
		} );
	} );
} );
