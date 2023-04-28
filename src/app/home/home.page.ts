import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
  providers:[NFC, Ndef]
})
export class HomePage {
  tag : any = "NO";

  constructor(private nfc: NFC, private ndef: Ndef) {
    this.nfc.enabled();
  }

  nfcActive(){
    this.nfc.addTagDiscoveredListener(() => {
      console.log('successfully attached ndef listener');
    }, (err:any) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event:any) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
      this.tag = this.nfc.bytesToHexString(event.tag.id);
      let message = this.ndef.textRecord('Hello world');  
      // this.nfc.share([message]).then(this.onSuccess).catch(this.onError);
    });
  }
  nfcWrite(){
    console.log('los');
    
    var message = [
        this.ndef.textRecord("hello, world"),
        this.ndef.uriRecord("http://github.com/chariotsolutions/phonegap-nfc")
    ];
    console.log('primero');
    
    this.nfc.write(message);

    console.log('aaaa');
    
  }
  onSuccess(){
    this.tag = "LEÍDO";
  }
  onError(){
    this.tag = "NO LEÍDO";
  }
}
