'use strict';

goog.provide('Blockly.Arduino.bipedPrint');
goog.provide('Blockly.Arduino.bipedMove');
goog.provide('Blockly.Arduino.bipedWait'); 
goog.provide('Blockly.Arduino.bipedLed');
goog.provide('Blockly.Arduino.bipedProximityRead');
goog.provide('Blockly.Arduino.bipedBluetoothButton');

goog.require('Blockly.Arduino');


function setupBiped()
{
	var bipedId = 'biped';
	var setupCode = bipedId + '.setup();';
	var loopCode = bipedId + '.loop();'; 

	Blockly.Arduino.addInclude('biped', '#include \"biped.h\"');
	Blockly.Arduino.addSetup('biped', setupCode, true);
	Blockly.Arduino.addLoop('bipedLoop',loopCode, true);
}


function hexToRgb(hex) 
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}



Blockly.Arduino['biped_print'] = function(block)
{
	setupBiped();
	var bipedId = 'biped';
	var content = Blockly.Arduino.valueToCode(
		block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';

	return bipedId + '.print(' + content + ');\n';
}

Blockly.Arduino['biped_move'] = function(block)
{
	setupBiped();
	var bipedId = 'biped';
	//var bipedId = block.getFieldValue('BIPED_ID');
	var servo = block.getFieldValue('SERVO_NUM');
	var milli  = Blockly.Arduino.valueToCode(
		block, 'TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'; 

	var deg  = Blockly.Arduino.valueToCode(
		block, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC) || '0'; 

	var moveCode = bipedId + '.' + 'move(' + servo + ', ' + deg + ', ' + milli 
						   + ');\n'; 

	return moveCode; 
}

Blockly.Arduino['biped_pin_move'] = function(block)
{
	setupBiped();
	var bipedId = 'biped';
	//var bipedId = block.getFieldValue('BIPED_ID');
	var servo = Blockly.Arduino.valueToCode(
		block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '0';

	var milli  = Blockly.Arduino.valueToCode(
		block, 'TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'; 

	var deg  = Blockly.Arduino.valueToCode(
		block, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC) || '0'; 

	var moveCode = bipedId + '.' + 'move(' + servo + ', ' + deg + ', ' + milli 
						   + ');\n'; 

	return moveCode; 
}

Blockly.Arduino['biped_wait'] = function(block)
{
	setupBiped();
	var bipedId = 'biped'; 
	var servo = block.getFieldValue('SERVO_NUM'); 
	var milli = Blockly.Arduino.valueToCode(
		block, 'TIME', Blockly.Arduino.ORDER_ATOMIC) || '0';

		var moveCode = bipedId + '.' + 'waitPause(' + servo + ',' + milli + ');\n'; 

		return moveCode; 
}

Blockly.Arduino['biped_led'] = function(block)
{
	setupBiped();
	var bipedId = 'biped';
	var ledPin = block.getFieldValue('LED_NUM') || 0;
	var hex = hexToRgb(block.getFieldValue('LED_COLOUR'));
	var hexCode = hex.r + ',' + hex.g + ',' + hex.b;
	
	var ledCode = bipedId + '.' + 'led.single(' + ledPin + ',' + hexCode + ');\n';
	return ledCode;
}

Blockly.Arduino['biped_button'] = function(block) 
{
	setupBiped();
	function statementToCodeNoTab(block, name) 
	{
		var targetBlock = block.getInputTargetBlock(name);
		var code = Blockly.Arduino.blockToCode(targetBlock);
		if (!goog.isString(code)) 
		{
			throw 'Expecting code from statement block"' + targetBlock.type + '".'; 
		}
		return code; 
	}

	var ABranch = Blockly.Arduino.statementToCode(block, 'A_FUNC');
	var AName = ABranch.split('(')[0]; 
	var code = "biped.setA(" + AName.trim() + ");"; 

	if (ABranch)
	{
		Blockly.Arduino.addSetup('userAButton', code, true);
	}

	var BBranch = statementToCodeNoTab(block, 'B_FUNC');
	var BName = BBranch.split('(')[0];
	var Bcode = "biped.setB(" + BName.trim() + ");\n";

	if (BBranch)
	{
		Blockly.Arduino.addSetup('userBButton', Bcode, true); 
	}

	return null; 
};

Blockly.Arduino['biped_bluetooth_button'] = function(block) 
{
	setupBiped();
	function statementToCodeNoTab(block, name) 
	{
		var targetBlock = block.getInputTargetBlock(name);
		var code = Blockly.Arduino.blockToCode(targetBlock);
		if (!goog.isString(code)) 
		{
			throw 'Expecting code from statement block"' + targetBlock.type + '".'; 
		}
		return code; 
	}

	var Branch = Blockly.Arduino.statementToCode(block, 'FUNC');
	var Name = Branch.split('(')[0]; 
	var button =  block.getFieldValue('BUTTON_CHAR');
	var code = "biped.setButton('" + button + "', " + Name.trim() + ");"; 


	if (Branch)
	{
		Blockly.Arduino.addSetup('user' + button + 'Button', code, true);
	}

	return null; 
};

Blockly.Arduino['biped_proximity_read'] = function(block) 
{
	setupBiped();
	var pinKey = block.getFieldValue('SENSOR_PIN');

	var code = 'biped.getProx(' + pinKey + ')';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};
