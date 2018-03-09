'use strict';

goog.provide('Blockly.Blocks.bipedPrint');
goog.provide('Blockly.Blocks.bipedMove');
goog.provide('Blockly.Blocks.bipedButton');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.bipedPrint.HUE = 160;
Blockly.Blocks.bipedMove.HUE = 190;
Blockly.Blocks.bipedButton.HUE = 290; 

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

		this.appendDummyInput()
			.appendField(new Blockly.FieldCheckbox('TRUE'), 'NEW_LINE');

		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
	}
};

Blockly.Blocks['biped_move'] = 
{
	init: function()
	{

		this.appendDummyInput()
			.appendField("move:"); 

		this.setColour(Blockly.Blocks.bipedMove.HUE);
		this.appendDummyInput()
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
