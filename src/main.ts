import './style.scss'

import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'login': [ Pages.LoginPage ],
  'register': [ Pages.RegisterPage ],
  'error': [ Pages.ErrorPage ],
  'nav': [ Pages.NavigatePage ],
  'chat': [ Pages.ChatPage ],
  'profile': [ Pages.ProfilePage ],
  'editData': [ Pages.EditDataPage ],
  'editPassword': [ Pages.EditPasswordPage ],
  'newAvatar': [ Pages.NewAvatarPage ],
};

Object.entries(Components).forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template);
});

type TKeyPage = keyof typeof pages;

function navigate(page: TKeyPage) {
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  console.log('html', temlpatingFunction(context))
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));
// document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', (event) => {
  const {target} = event;
  if(target instanceof HTMLElement) {
    const page = target.getAttribute('page');
    if (page) {
      navigate(page as TKeyPage);
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
});



