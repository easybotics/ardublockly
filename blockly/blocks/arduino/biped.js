'use strict';

goog.provide('Blockly.Blocks.bipedPrint');
goog.provide('Blockly.Blocks.bipedMove');
goog.provide('Blockly.Blocks.bipedButton');
goog.provide('Blockly.Blocks.bipedWait'); 
goog.provide('Blockly.Blocks.bipedLed'); 
goog.provide('Blockly.Blocks.bipedProximityRead'); 

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.bipedPrint.HUE = 160;
Blockly.Blocks.bipedMove.HUE = 190;
Blockly.Blocks.bipedButton.HUE = 290; 
Blockly.Blocks.bipedProximityRead.HUE = 60;

Blockly.Blocks['biped_print'] = 
{
	init: function()
	{
		this.setColour(Blockly.Blocks.bipedPrint.HUE);
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown(
				Blockly.Arduino.Boards.selected.biped), 'BIPED_ID')
			.appendField("Biped print");

		this.appendValueInput('CONTENT');

		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
	}
};

Blockly.Blocks['biped_move'] = 
{
	init: function()
	{

		this.setColour(Blockly.Blocks.bipedMove.HUE);
		this.appendDummyInput()
			.appendField("rotate")
			.appendField(new Blockly.FieldDropdown(
				Blockly.Arduino.Boards.selected.servos), 'SERVO_NUM')
			.appendField("servo"); 

		this.appendValueInput('DEGREE')
			.setCheck('Number')
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField('degree value'); 

		this.appendValueInput('TIME')
				.setCheck('Number')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('millisecond value'); 


		this.setPreviousStatement(true,null);
		this.setNextStatement(true,null);
	},

	updateFields: function() 
	{
	}
};

Blockly.Blocks['biped_wait'] = 
{
	init: function()
	{
		this.setColour(Blockly.Blocks.bipedMove.HUE);

		this.appendDummyInput()
			.appendField("wait for")
			.appendField(new Blockly.FieldDropdown(
				Blockly.Arduino.Boards.selected.waitServos), 'SERVO_NUM')
			.appendField("servo"); 

		this.appendValueInput('TIME')
			.setCheck('Number')
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField('millisecond value'); 

		this.setPreviousStatement(true,null);
		this.setNextStatement(true,null);
	}
}; 

Blockly.Blocks['biped_led'] = 
{
	init: function()
	{

		this.setColour(Blockly.Blocks.bipedMove.HUE);
		this.appendDummyInput()
			.appendField("change led")
			.appendField(new Blockly.FieldDropdown(
				Blockly.Arduino.Boards.selected.leds), 'LED_NUM');


		this.appendDummyInput()
			.appendField("to colour")
			.appendField(new Blockly.FieldColour('#ff0000'), 'LED_COLOUR');

		this.setPreviousStatement(true,null);
		this.setNextStatement(true,null);
	}
};

Blockly.Blocks['biped_button'] = 
{
	init: function()
	{
		this.appendDummyInput()
			.appendField("Button A:");
		this.appendStatementInput('A_FUNC');

		this.appendDummyInput()
			.appendField("Button B:");
		this.appendStatementInput('B_FUNC');

		this.setInputsInline(false);
		this.setColour(Blockly.Blocks.bipedButton.HUE);
		this.contextMenu = false; 
	}
};

Blockly.Blocks['biped_proximity_read'] = 
{
	init: function()
	{
		this.setColour(Blockly.Blocks.bipedProximityRead.HUE);

		this.appendDummyInput()
			.appendField("Read proximity from sensor")
			.appendField(new Blockly.FieldDropdown(
				Blockly.Arduino.Boards.selected.proximitySensors), 'SENSOR_PIN');

		this.setOutput(true, Blockly.Types.NUMBER.output);
	},
	
	getBlockType: function()
	{
		return Blockly.Types.NUMBER;
	},

};
