import { addToArray, removeFromArray } from '../../utils/array';
import { unescapeKey } from '../../shared/keypaths';
import { capture } from '../../global/capture';
import noop from '../../utils/noop';

export default class KeyModel {
	constructor ( key, parent ) {
		this.value = key;
		this.isReadonly = this.isKey = true;
		this.deps = [];
		this.links = [];
		this.parent = parent;
	}

	get ( shouldCapture ) {
		if ( shouldCapture ) capture( this );
		return unescapeKey( this.value );
	}

	getKeypath () {
		return unescapeKey( this.value );
	}

	rebinding ( next, previous ) {
		let i = this.deps.length;
		while ( i-- ) this.deps[i].rebinding( next, previous, false );

		i = this.links.length;
		while ( i-- ) this.links[i].rebinding( next, previous, false );
	}

	register ( dependant ) {
		this.deps.push( dependant );
	}

	registerLink ( link ) {
		addToArray( this.links, link );
	}

	unregister ( dependant ) {
		removeFromArray( this.deps, dependant );
	}

	unregisterLink ( link ) {
		removeFromArray( this.links, link );
	}
}

KeyModel.prototype.reference = noop;
KeyModel.prototype.unreference = noop;
