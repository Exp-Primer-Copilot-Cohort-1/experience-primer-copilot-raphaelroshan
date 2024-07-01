function skillsMember() {
  var member = document.getElementById('member');
  var memberValue = member.options[member.selectedIndex].value;
  var memberText = member.options[member.selectedIndex].text;

  if (memberValue == '0') {
    document.getElementById('memberSkills').innerHTML = '';
  } else {
    var memberSkills = memberText + ' has the following skills: ';
    document.getElementById('memberSkills').innerHTML = memberSkills;
  }
}