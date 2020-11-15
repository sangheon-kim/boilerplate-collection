const fs = require('fs');
const glob = require('glob');

const imgPath = 'src/images/src/';

const reg = /((src\/images\/src\/)(((.+)@2x)(.png)))/;
module.exports = {
	rename: () =>
		new Promise((resolve, reject) => {
			glob(`${imgPath}/*@2x.png`, function (er, files) {
				files.map((item) => {
					fs.rename(item, item.replace(reg, '$2$5-2x$6'), (err) => {
						if (err) reject(err);

						console.log('Rename complete');
					});
				});
			}),
				resolve('ok');
		}),
};
