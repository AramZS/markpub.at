
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
    <description>${data.description || data.site.description}</description>
    <script>
		window.pageData = {};
		</script>
		${zones.earlyHead || ''}
		${templateStyle}
		${zones.lateHead || ''}
    <!-- Privacy-friendly analytics by Plausible -->
    <script async src="https://plausible.io/js/pa-SbF9f4OaK8xa9S5YQpgOZ.js"></script>
    <script>
      window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
      plausible.init()
    </script>

	</head>
	<body>
		<div id="inner-body">
      ${zones?.innerBody ? zones.innerBody : zones.content}
	</body>
</html>`;
};
