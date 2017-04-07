/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import DefaultPostFormat from './default-post-format';
import AfterTheDeadline from './after-the-deadline';
import DateTimeFormat from '../date-time-format';
import {
	isJetpackSite,
	isJetpackMinimumVersion,
	siteSupportsJetpackSettingsUi,
} from 'state/sites/selectors';
import { getSelectedSiteId } from 'state/ui/selectors';

const Composing = ( {
	fields,
	handleToggle,
	handleSelect,
	onChangeField,
	setFieldValue,
	eventTracker,
	hasDateTimeFormats,
	isRequestingSettings,
	isSavingSettings,
	jetpackSettingsUISupported,
	siteIsJetpack,
	updateFields,
} ) => {
	return (
		<div>
			<Card className="composing__site-settings site-settings">
				<DefaultPostFormat
					onChangeField={ onChangeField }
					eventTracker={ eventTracker }
					isSavingSettings={ isSavingSettings }
					isRequestingSettings={ isRequestingSettings }
					fields={ fields }
				/>
				{
					siteIsJetpack && jetpackSettingsUISupported && (
						<div>
							<hr />
							<AfterTheDeadline
								handleToggle={ handleToggle }
								setFieldValue={ setFieldValue }
								isSavingSettings={ isSavingSettings }
								isRequestingSettings={ isRequestingSettings }
								fields={ fields }
							/>
						</div>
					)
				}
			</Card>
			{ hasDateTimeFormats &&
				<DateTimeFormat
					handleSelect={ handleSelect }
					isSavingSettings={ isSavingSettings }
					isRequestingSettings={ isRequestingSettings }
					fields={ fields }
					updateFields={ updateFields }
				/>
			}
		</div>
	);
};

Composing.defaultProps = {
	isSavingSettings: false,
	isRequestingSettings: true,
	fields: {}
};

Composing.propTypes = {
	handleToggle: PropTypes.func.isRequired,
	onChangeField: PropTypes.func.isRequired,
	setFieldValue: PropTypes.func.isRequired,
	eventTracker: PropTypes.func.isRequired,
	isSavingSettings: PropTypes.bool,
	isRequestingSettings: PropTypes.bool,
	fields: PropTypes.object,
};

export default connect(
	( state ) => {
		const siteId = getSelectedSiteId( state );

		const siteIsJetpack = isJetpackSite( state, siteId );

		return {
			jetpackSettingsUISupported: siteSupportsJetpackSettingsUi( state, siteId ),
			siteIsJetpack,
			hasDateTimeFormats: ! siteIsJetpack || isJetpackMinimumVersion( state, siteId, '4.7' ),
		};
	}
)( Composing );
