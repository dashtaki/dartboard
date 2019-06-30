import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public toggleLoadingSpinner(mode: 'show' | 'hide') {
    let spinner = document.querySelector('#loading-spinner');
    if (mode === 'show')
      spinner.classList.add('show');
    else if (mode === 'hide')
      spinner.classList.remove('show');
  }

  public isUserLoggedIn() {
    let userInfo = localStorage.getItem('userInfo');
    return !!userInfo;
  }

  public showAlert(message: string) {
    let alert = document.querySelector('#dart-alert');
    if (alert) {
      alert.innerHTML = message;
      alert.classList.add('show');
      setTimeout(() => {
        alert.classList.remove('show');
      }, 3000);
    }
  }
}
