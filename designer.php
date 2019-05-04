<!DOCTYPE HTML>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>¡Diseña tu ASCard</title>

    <!-- Style sheets -->
    <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap-material-design.css" />
    <link rel="stylesheet" type="text/css" href="css/main.css">

    <!-- Google Webfonts -->
    <link href='http://fonts.googleapis.com/css?family=Gorditas' rel='stylesheet' type='text/css'>

	<!-- jQuery UI - required -->
	<link href="css/jquery-ui.css" rel="stylesheet" />
    <!-- Custom iconic font - required -->
    <link href="css/icon-font.css" rel="stylesheet" />
    <!-- External plugins css - required -->
    <link rel="stylesheet" type="text/css" href="css/plugins.min.css" />
    <!-- The CSS for the plugin itself - required -->
	<link rel="stylesheet" type="text/css" href="css/jquery.fancyProductDesigner.css" />
	<!-- Optional - only when you would like to use custom fonts - optional -->
	<link rel="stylesheet" type="text/css" href="css/jquery.fancyProductDesigner-fonts.css" />

    <!-- Include js files -->
	<script src="js/jquery.min.js" type="text/javascript"></script>
	<script src="js/jquery-ui.min.js" type="text/javascript"></script>
	<script src="vendor/bootstrap/js/bootstrap-material-design.min.js" type="text/javascript"></script>

	<!-- HTML5 canvas library - required -->
	<script src="js/fabric.js" type="text/javascript"></script>
	<!-- The plugin itself - required -->
    <script src="js/jquery.fancyProductDesigner.min.js" type="text/javascript"></script>

    <script type="text/javascript">
	    jQuery(document).ready(function(){

	    	var yourDesigner = $('#clothing-designer').fancyProductDesigner({
	    		editorMode: false,
	    		fonts: ['Arial', 'Fearless', 'Helvetica', 'Times New Roman', 'Verdana', 'Geneva', 'Gorditas'],
	    		customTextParameters: {
		    		colors: false,
		    		removable: true,
		    		resizable: true,
		    		draggable: true,
		    		rotatable: true,
		    		autoCenter: true,
		    		boundingBox: "Base"
		    	},
	    		customImageParameters: {
		    		draggable: true,
                    resizable: true,
		    		removable: true,
		    		colors: '#000',
		    		autoCenter: true,
		    		boundingBox: "Base"
		    	}
	    	}).data('fancy-product-designer');

	    	//print button
			$('#print-button').click(function(){
				yourDesigner.print();
				return false;
			});

			//create an image
			$('#image-button').click(function(){
				var image = yourDesigner.createImage();
				return false;
			});

			//create a pdf with jsPDF
			$('#pdf-button').click(function(){
				var image = new Image();
				image.src = yourDesigner.getProductDataURL('jpeg', '#ffffff');
				image.onload = function() {
					var doc = new jsPDF();
					doc.addImage(this.src, 'JPEG', 0, 0, this.width * 0.2, this.height * 0.2);
					doc.save('AsCard.pdf');
				}
				return false;
			});

			//checkout button with getProduct()
			$('#checkout-button').click(function(){
				var product = yourDesigner.getProduct();
				console.log(product);
				return false;
			});

			//event handler when the price is changing
			$('#clothing-designer')
			.bind('priceChange', function(evt, price, currentPrice) {
				$('#thsirt-price').text(currentPrice);
			});

			//recreate button
			$('#recreation-button').click(function(){
				var fabricJSON = JSON.stringify(yourDesigner.getFabricJSON());
				$('#recreation-form input:first').val(fabricJSON).parent().submit();
				return false;
			});

			//click handler for input upload
			$('#upload-button').click(function(){
				$('#design-upload').click();
				return false;
			});

			//save image on webserver
			$('#save-image-php').click(function() {
				$.post( "php/save_image.php", { base64_image: yourDesigner.getProductDataURL()} );
			});

			//send image via mail
			$('#send-image-mail-php').click(function() {
				$.post( "php/send_image_via_mail.php", { base64_image: yourDesigner.getProductDataURL()} );
			});

			//upload image
			document.getElementById('design-upload').onchange = function (e) {
				if(window.FileReader) {
					var reader = new FileReader();
			    	reader.readAsDataURL(e.target.files[0]);
			    	reader.onload = function (e) {

			    		var image = new Image;
			    		image.src = e.target.result;
			    		image.onload = function() {
				    		var maxH = 400,
			    				maxW = 300,
			    				imageH = this.height,
			    				imageW = this.width,
			    				scaling = 1;

							if(imageW > imageH) {
								if(imageW > maxW) { scaling = maxW / imageW; }
							}
							else {
								if(imageH > maxH) { scaling = maxH / imageH; }
							}

				    		yourDesigner.addElement('image', e.target.result, 'my custom design', {colors: $('#colorizable').is(':checked') ? '#000000' : false, zChangeable: true, removable: true, draggable: true, resizable: true, rotatable: true, autoCenter: true, boundingBox: "Base", scale: scaling});
			    		};
					};
				}
				else {
					alert('FileReader API no es soportada por tu navegador, por favor utiliza Firefox Quantum, Safari, Google Chrome/Chromium ó IE10!')
				}
			};
	    });
    </script>
    </head>

    <body>
    	<div id="main-container" class="container">
          	<h3 id="clothing">AsDesigner</h3>
          	<div id="clothing-designer" class="fpd-shadow-1">

				<div class="fpd-product" title="AsCard Horizontal Frontal" data-thumbnail="img/horizontal-card/preview.png">
					<img src="img/horizontal-card/front/base.png" title="Base" data-parameters='{"x": 450, "y": 250, "colors": "#ededed", "price": 124.5}' />
					<div class="fpd-product" title="AsCard Horizontal Back" data-thumbnail="img/horizontal-card/preview.png">
					<img src="img/horizontal-card/back/base.png" title="Base" data-parameters='{"x": 450, "y": 250, "colors": "#ededed", "price": 124.5}' />
					</div>
				</div>

				<div class="fpd-product" title="AsCard Vertical" data-thumbnail="img/vertical-card/preview.png">
					<img src="img/vertical-card/front/base.png" title="Base" data-parameters='{"x": 450, "y": 250, "colors": "#ededed", "price": 124.5}' />
					<div class="fpd-product" title="AsCard Vertical Back" data-thumbnail="img/vertical-card/preview.png">
					<img src="img/vertical-card/back/base.png" title="Base" data-parameters='{"x": 450, "y": 250, "colors": "#ededed", "price": 125.5}' />
					</div>
				</div>


		  		<div class="fpd-design">

		  			<div class="fpd-category" title="Characters">
			  			<img src="img/designs/characters/jake.png" title="Jake The Dog" data-parameters='{"x": 210, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 7, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="img/designs/characters/finn.png" title="Finn The Human" data-parameters='{"x": 210, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 7, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="img/designs/characters/rick.png" title="Rick Sánchez" data-parameters='{"x": 210, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 7, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="img/designs/characters/morty.png" title="Morty Smith" data-parameters='{"x": 210, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 7, "boundingBox": "Base", "autoCenter": true}' />
				  	</div>
					<div class="fpd-category" title="Logos">
			  			<img src="img/designs/logos/af.png" title="Adobe After Effects" data-parameters='{"x": 210, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 7, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="img/designs/logos/ab.png" title="Adobe Bridge" data-parameters='{"x": 210, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 7, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="img/designs/logos/acc.png" title="Adobe Creative Cloud" data-parameters='{"x": 210, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 7, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="img/designs/logos/dreamweaver.png" title="Adobe DreamWeaver" data-parameters='{"x": 210, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 7, "boundingBox": "Base", "autoCenter": true}' />
				  	</div>
		  		</div>
		  	</div>
		  	<br />
		  	<div class="row">
			  	<div class="api-buttons col-md-7">
				  	<a href="#" id="print-button" class="btn btn-raised btn-secondary">Imprimir</a>
				  	<a href="#" id="image-button" class="btn btn-raised btn-info">Crear imágen</a>
				  	<a href="#" id="pdf-button" class="btn btn-raised btn-danger">Crear PDF</a>
				  	<a href="#" id="checkout-button" class="btn btn-raised btn-success">Comprar</a>
				  	<a href="#" id="recreation-button" class="btn btn-raised btn-warning">Recrear producto</a>
			  	</div>
			  	<div class="col-md-2">
			  		<a href="#" id="upload-button" class="btn btn-raised btn-warning">¡Sube tu propio diseño!</a>
				  	<label class="checkbox inline"><input type="checkbox" id="colorizable" />¿Coloreable?</label>
			  	</div>
			  	<div class="col-md-4">
					  <br>
					  <span class="price badge badge-pill badge-success"><span id="thsirt-price"></span> $ en total.</span>
					  <br>
			  	</div>
		  	</div>

		  	<h4>Para cuando tengamos backend:</h4>
		  	<button class="btn btn-raised btn-secondary" id="save-image-php">Guardar imágen con PHP</button>
		  	<button class="btn btn-raised btn-info" id="send-image-mail-php">Envíanos tu diseño por mail</button>

		  	<!-- The form recreation -->
		  	<input type="file" id="design-upload" style="display: none;" />
			<form action="php/recreation.php" id="recreation-form" method="post">
				<input type="hidden" name="recreation_product" value="" />
			</form>

    	</div>
    </body>
</html>
