/** @format */
export function isLikesPopoverOpen( state, postGlobalId ) {
	if ( ! postGlobalId ) {
		// Avoid returning `true` if an invalid post ID is passed.
		return false;
	}
	return state.ui.postTypeList.postIdWithActiveLikesPopover === postGlobalId;
}

export function isSharePanelOpen( state, postGlobalId ) {
	return state.ui.postTypeList.activeSharePanels.indexOf( postGlobalId ) > -1;
}

export function isPostSelected( state, postGlobalId ) {
	return state.ui.postTypeList.selectedPosts.indexOf( postGlobalId ) > -1;
}

export function getSelectedPostsCount( state ) {
	return state.ui.postTypeList.selectedPosts.length;
}

export function isMultiSelectEnabled( state ) {
	return state.ui.postTypeList.isMultiSelectEnabled;
}
