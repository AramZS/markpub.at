
module.exports = async function(data, zones) {
  // console.log("layout data", data);
  let templateStyle = '';
  if (zones.template) {
    templateStyle = `<link rel="stylesheet" href="/assets/css/template-${zones.template}.css">`;
  }
  return /*html*/ `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1">
		<title>${data.title || data.site.title}</title>
    <script>
		window.pageData = {};
		</script>
		${zones.earlyHead || ''}
		${templateStyle}
		${zones.lateHead || ''}
	</head>
	<body>
		<div id="inner-body">
      ${zones?.innerBody ? zones.innerBody : zones.content}
	</body>
</html>`;
};
