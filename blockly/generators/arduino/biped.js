'use strict';

goog.provide('Blockly.Arduino.bipedPrint');
goog.provide('Blockly.Arduino.bipedMove');
goog.provide('Blockly.Arduino.bipedWait'); 

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

Blockly.Arduino['biped_button'] = function(block) 
{
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
