/**
 * External dependencies
 */
import { isNumber } from 'lodash';
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import {
	WOOCOMMERCE_EDIT_PRODUCT,
	WOOCOMMERCE_EDIT_PRODUCT_VARIATION_TYPE,
	WOOCOMMERCE_EDIT_PRODUCT_VARIATION,
} from '../../action-types';

const debug = debugFactory( 'woocommerce:state:ui:products' );

const initialState = null;

export default function( state = initialState, action ) {
	const handlers = {
		[ WOOCOMMERCE_EDIT_PRODUCT ]: editProductAction,
		[ WOOCOMMERCE_EDIT_PRODUCT_VARIATION_TYPE ]: editProductVariationTypeAction,
		[ WOOCOMMERCE_EDIT_PRODUCT_VARIATION ]: editProductVariationAction,
	};

	const handler = handlers[ action.type ];

	return ( handler && handler( state, action ) ) || state;
}

function editProductAction( edits, action ) {
	const { product, newProductIndex, data } = action.payload;

	return editProduct( edits, product, newProductIndex, data );
}

function editProductVariationTypeAction( edits, action ) {
	const { newProductIndex, product, attributeIndex, data } = action.payload;
	const attributes = product && product.attributes;

	const _attributes = editProductVariationType( attributes, attributeIndex, data );

	return editProduct( edits, product, newProductIndex, { attributes: _attributes } );
}

function editProductVariationAction( state, action ) {
	// TODO: Remove this temporary code.
	console.log( 'editVariation' );
}

function editProduct( edits, product, newProductIndex, data ) {
	if ( newProductIndex !== undefined ) {
		const prevEdits = edits || {};
		const creates = editNewProduct( prevEdits.creates, newProductIndex, data );
		return { ...prevEdits, creates };
	}

	// Must be an existing product
	const prevEdits = edits || {};
	const updates = editExistingProduct( prevEdits.updates, product, data );
	return { ...prevEdits, updates };
}

function editExistingProduct( updates, product, data ) {
	const prevUpdates = updates || [];

	let found = false;

	const _updates = prevUpdates.map( ( prevUpdate ) => {
		if ( product.id === prevUpdate.id ) {
			found = true;
			return { ...prevUpdate, ...data };
		}

		return prevUpdate;
	} );

	if ( ! found ) {
		_updates.push( { id: product.id, ...data } );
	}

	return _updates;
}

function editNewProduct( creates, newProductIndex, data ) {
	const prevCreates = creates || [];
	const index = ( isNumber( newProductIndex ) ? newProductIndex : prevCreates.length );

	const _creates = [ ...prevCreates ];
	const prevCreate = prevCreates[ index ] || {};

	_creates[ index ] = { ...prevCreate, ...data };

	return _creates;
}

function editProductVariationType( attributes, attributeIndex, data ) {
	const prevAttributes = attributes || [];
	const index = ( isNumber( attributeIndex ) ? attributeIndex : prevAttributes.length );

	const _attributes = [ ...prevAttributes ];
	const prevAttribute = prevAttributes[ index ] || { variation: true, options: [] };

	if ( prevAttribute.variation ) {
		_attributes[ index ] = { ...prevAttribute, ...data };
	} else {
		debug( 'WARNING: Attempting to edit a non-variation attribute as a variation type.' );
	}

	return _attributes;
}

