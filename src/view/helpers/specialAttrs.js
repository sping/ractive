const space = /\s+/;
const remove = /\/\*(?:[\s\S]*?)\*\//g;
const escape = /url\(\s*(['"])(?:\\[\s\S]|(?!\1).)*\1\s*\)|url\((?:\\[\s\S]|[^)])*\)|(['"])(?:\\[\s\S]|(?!\1).)*\2/gi;
const value = /\0(\d+)/g;

export function readStyle ( css ) {
	let values = [];

	if ( typeof css !== 'string' ) return {};

	return css.replace( escape, match => `\0${values.push( match ) - 1}`)
		.replace( remove, '' )
		.split( ';' )
		.filter( rule => !!rule.trim() )
		.map( rule => rule.replace( value, ( match, n ) => values[ n ] ) )
		.reduce(( rules, rule ) => {
			let i = rule.indexOf(':');
			let name = rule.substr( 0, i ).trim();
			rules[ name ] = rule.substr( i + 1 ).trim();
			return rules;
		}, {});
}

export function readClass ( str ) {
	const list = str.split( space );

	// remove any empty entries
	let i = list.length;
	while ( i-- ) {
		if ( !list[i] ) list.splice( i, 1 );
	}

	return list;
}
