from flask_wtf import FlaskForm
from wtforms import RadioField, SelectMultipleField, validators, widgets


class MultiCheckboxField(SelectMultipleField):
    widget = widgets.ListWidget(prefix_label=False)
    option_widget = widgets.CheckboxInput()

class OrderForm(FlaskForm):
    temp = RadioField('Hot or iced?', choices=['Hot', 'Iced'], validators=[validators.DataRequired()])
    milk = RadioField('What type of milk?', choices=['Whole', 'Oat'], validators=[validators.DataRequired()])
    flavors = MultiCheckboxField('Which flavor(s)?', choices=[(choice.lower(), choice) for choice in ['Chocolate Milano', 'Creme de Menthe', 'Bourbon Caramel', 'White Chocolate', 'Peanut Butter', 'Honey', 'Creme de Banana']], validators=[validators.DataRequired()])
