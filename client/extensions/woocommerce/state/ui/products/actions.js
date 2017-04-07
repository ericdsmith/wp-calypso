/**
 * Internal dependencies
 */
import {
	WOOCOMMERCE_EDIT_PRODUCT,
	WOOCOMMERCE_EDIT_PRODUCT_VARIATION_TYPE,
	WOOCOMMERCE_EDIT_PRODUCT_VARIATION,
} from '../../action-types';

export function editProduct( product, data ) {
	return {
		type: WOOCOMMERCE_EDIT_PRODUCT,
		payload: { product, data },
	};
}

export function editNewProduct( newProductIndex, product, data ) {
	return {
		type: WOOCOMMERCE_EDIT_PRODUCT,
		payload: { newProductIndex, product, data },
	};
}

export function editProductVariationType( product, attributeIndex, data ) {
	return {
		type: WOOCOMMERCE_EDIT_PRODUCT_VARIATION_TYPE,
		payload: { product, attributeIndex, data },
	};
}

export function editNewProductVariationType( newProductIndex, product, attributeIndex, data ) {
	return {
		type: WOOCOMMERCE_EDIT_PRODUCT_VARIATION_TYPE,
		payload: { newProductIndex, product, attributeIndex, data },
	};
}

