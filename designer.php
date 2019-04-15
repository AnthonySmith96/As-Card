<!DOCTYPE HTML>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>¡Diseña tu ASCard</title>

    <!-- Style sheets -->
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css" />
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
	<script src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>

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
					doc.save('Product.pdf');
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
          		<div class="fpd-product" title="Shirt Front" data-thumbnail="img/yellow_shirt/front/preview.png">
	    			<img src="img/yellow_shirt/front/base.png" title="Base" data-parameters='{"x": 325, "y": 329, "colors": "#d59211", "price": 20}' />
			  		<img src="img/yellow_shirt/front/shadows.png" title="Shadow" data-parameters='{"x": 325, "y": 329}' />
			  		<img src="img/yellow_shirt/front/body.png" title="Hightlights" data-parameters='{"x": 322, "y": 137}' />
			  		<span title="Any Text" data-parameters='{"boundingBox": "Base", "x": 326, "y": 232, "zChangeable": true, "removable": true, "draggable": true, "rotatable": true, "resizable": true, "colors": "#000000"}' >Default Text</span>
			  		<div class="fpd-product" title="Shirt Back" data-thumbnail="img/yellow_shirt/back/preview.png">
		    			<img src="img/yellow_shirt/back/base.png" title="Base" data-parameters='{"x": 317, "y": 329, "colors": "Base", "price": 20}' />
		    			<img src="img/yellow_shirt/back/body.png" title="Hightlights" data-parameters='{"x": 333, "y": 119}' />
				  		<img src="img/yellow_shirt/back/shadows.png" title="Shadow" data-parameters='{"x": 318, "y": 329}' />
					</div>
				</div>
          		<div class="fpd-product" title="Sweater" data-thumbnail="img/sweater/preview.png">
	    			<img src="img/sweater/basic.png" title="Base" data-parameters='{"x": 332, "y": 311, "colors": "#D5D5D5,#990000,#cccccc", "price": 20}' />
			  		<img src="img/sweater/highlights.png" title="Hightlights" data-parameters='{"x": 332, "y": 311}' />
			  		<img src="img/sweater/shadow.png" title="Shadow" data-parameters='{"x": 332, "y": 309}' />
				</div>
				<div class="fpd-product" title="Scoop Tee" data-thumbnail="img/scoop_tee/preview.png">
	    			<img src="img/scoop_tee/basic.png" title="Base" data-parameters='{"x": 314, "y": 323, "colors": "#98937f, #000000, #ffffff", "price": 15}' />
			  		<img src="img/scoop_tee/highlights.png" title="Hightlights" data-parameters='{"x":308, "y": 316}' />
			  		<img src="img/scoop_tee/shadows.png" title="Shadow" data-parameters='{"x": 308, "y": 316}' />
			  		<img src="img/scoop_tee/label.png" title="Label" data-parameters='{"x": 314, "y": 140}' />
				</div>
				<div class="fpd-product" title="Hoodie" data-thumbnail="img/hoodie/preview.png">
	    			<img src="img/hoodie/basic.png" title="Base" data-parameters='{"x": 313, "y": 322, "colors": "#850b0b", "price": 40}' />
			  		<img src="img/hoodie/highlights.png" title="Hightlights" data-parameters='{"x": 311, "y": 318}' />
			  		<img src="img/hoodie/shadows.png" title="Shadow" data-parameters='{"x": 311, "y": 321}' />
			  		<img src="img/hoodie/zip.png" title="Zip" data-parameters='{"x": 303, "y": 216}' />
				</div>
				<div class="fpd-product" title="Shirt" data-thumbnail="img/shirt/preview.png">
	    			<img src="img/shirt/basic.png" title="Base" data-parameters='{"x": 327, "y": 313, "colors": "#6ebed5", "price": 10}' />
	    			<img src="img/shirt/collar_arms.png" title="Collars & Arms" data-parameters='{"x": 326, "y": 217, "colors": "#000000"}' />
			  		<img src="img/shirt/highlights.png" title="Hightlights" data-parameters='{"x": 330, "y": 313}' />
			  		<img src="img/shirt/shadow.png" title="Shadow" data-parameters='{"x": 327, "y": 312}' />
			  		<span title="Any Text" data-parameters='{"boundingBox": "Base", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "colors": "#000000"}' >Default Text</span>
				</div>
				<div class="fpd-product" title="Short" data-thumbnail="img/shorts/preview.png">
	    			<img src="img/shorts/basic.png" title="Base" data-parameters='{"x": 317, "y": 332, "colors": "#81b5eb", "price": 15}' />
			  		<img src="img/shorts/highlights.png" title="Hightlights" data-parameters='{"x": 318, "y": 331}' />
			  		<img src="img/shorts/pullstrings.png" title="Pullstrings" data-parameters='{"x": 307, "y": 195, "colors": "#ffffff"}' />
			  		<img src="img/shorts/midtones.png" title="Midtones" data-parameters='{"x": 317, "y": 332}' />
			  		<img src="img/shorts/shadows.png" title="Shadow" data-parameters='{"x": 320, "y": 331}' />
				</div>
				<div class="fpd-product" title="Basecap" data-thumbnail="img/cap/preview.png">
	    			<img src="img/cap/basic.png" title="Base" data-parameters='{"x": 318, "y": 311, "colors": "#ededed", "price": 5}' />
			  		<img src="img/cap/highlights.png" title="Hightlights" data-parameters='{"x": 309, "y": 300}' />
			  		<img src="img/cap/shadows.png" title="Shadows" data-parameters='{"x": 306, "y": 299}' />
				</div>
				<div class="fpd-product" title="AsCard" data-thumbnail="img/cards/preview.jpg">
	    			<img src="img/cards/horizontal/ashor.png" title="AsCard Horizontal" data-parameters='{"x": 318, "y": 311, "colors": "#ededed", "price": 5}' />
			  		<img src="img/cards/vertical/asver.png" title="AsCard Vertical" data-parameters='{"x": 309, "y": 300}' />
				</div>
		  		<div class="fpd-design">
		  			<div class="fpd-category" title="Swirls">
			  			<img src="img/designs/swirl.png" title="Swirl" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "price": 10, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="img/designs/swirl2.png" title="Swirl 2" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "price": 5, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="img/designs/swirl3.png" title="Swirl 3" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "autoCenter": true}' />
				  		<img src="img/designs/heart_blur.png" title="Heart Blur" data-parameters='{"x": 215, "y": 200, "colors": "#bf0200", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "price": 5, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="img/designs/converse.png" title="Converse" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "autoCenter": true}' />
				  		<img src="img/designs/crown.png" title="Crown" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "autoCenter": true}' />
				  		<img src="img/designs/men_women.png" title="Men hits Women" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
		  			</div>
		  			<div class="fpd-category" title="Retro">
			  			<img src="img/designs/retro_1.png" title="Retro One" data-parameters='{"x": 210, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 7, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="img/designs/retro_2.png" title="Retro Two" data-parameters='{"x": 193, "y": 180, "colors": "#ffffff", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.46, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="img/designs/retro_3.png" title="Retro Three" data-parameters='{"x": 240, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 8, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="img/designs/heart_circle.png" title="Heart Circle" data-parameters='{"x": 240, "y": 200, "colors": "#007D41", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.4, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="img/designs/swirl.png" title="Swirl" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "price": 10, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="img/designs/swirl2.png" title="Swirl 2" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "price": 5, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="img/designs/swirl3.png" title="Swirl 3" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true}' />
				  	</div>
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
				  	<a href="#" id="print-button" class="btn btn-primary">Imprimir</a>
				  	<a href="#" id="image-button" class="btn btn-primary">Crear imágen</a>
				  	<a href="#" id="pdf-button" class="btn btn-primary">Crear PDF</a>
				  	<a href="#" id="checkout-button" class="btn btn-success">Comprar</a>
				  	<a href="#" id="recreation-button" class="btn btn-success">Recrear producto</a>
			  	</div>
			  	<div class="col-md-2">
			  		<a href="#" id="upload-button" class="btn btn-warning">¡Sube tu propio diseño!</a>
				  	<label class="checkbox inline"><input type="checkbox" id="colorizable" />¿Coloreable?</label>
			  	</div>
			  	<div class="col-md-3">
				  	<span class="price badge badge-inverse"><span id="thsirt-price"></span> $</span>
			  	</div>
		  	</div>

		  	<h4>Para cuando tengamos backend:</h4>
		  	<button class="btn btn-info" id="save-image-php">Guardar imágen con PHP</button>
		  	<button class="btn btn-info" id="send-image-mail-php">Envíanos tu diseño por mail</button>

		  	<!-- The form recreation -->
		  	<input type="file" id="design-upload" style="display: none;" />
			<form action="php/recreation.php" id="recreation-form" method="post">
				<input type="hidden" name="recreation_product" value="" />
			</form>

    	</div>
    </body>
</html>
