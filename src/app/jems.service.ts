import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class HealthCheck {
  status: string;
  updateTime: string;
  consul: object;
  SqlServer: {
    database: string;
    status: string;
  };
  RabbitMQ: {
    queue: string;
    status: string;
  };
  HttpCheck: {
    status: string;
  };
  ConfigurationVerification: {
    AuthOptionsBase: {
      unsetOptionsCount: number;
      unsetOptions: any[];
    };
    TokenSigningBase: {
      unsetOptionsCount: number;
      unsetOptions: any[];
    };
    SAPMiiServiceOptions: {
      unsetOptionsCount: number;
      unsetOptions: any[];
    };
    MulesoftSetupSheetsServiceOptions: {
      unsetOptionsCount: number;
      unsetOptions: any[];
    };
    MulesoftPlannedOrderServiceOptions: {
      unsetOptionsCount: number;
      unsetOptions: any[];
    };
    RabbitMQConfigBase: {
      unsetOptionsCount: number;
      unsetOptions: any[];
    };
    SQLConfigBase: {
      unsetOptionsCount: number;
      unsetOptions: any[];
    };
    ServiceUrlsBase: {
      unsetOptionsCount: number;
      unsetOptions: any[];
    };
    NServiceBusConfigBase: {
      unsetOptionsCount: number;
      unsetOptions: any[];
    };
    status:string
  };
  diskSpace:{
    total:number,
    free:number,
    threshold:number,
    status:string
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('http://prd.jemsmm.mty.corp.jabil.org:9035/mgmt/health').pipe(
      map((response:any) => {
        let healthCheck = new HealthCheck();
        healthCheck.updateTime = new Date().toLocaleString();
        healthCheck.status = response.status;
        healthCheck.consul = response.consul;
        healthCheck.SqlServer = response["SqlServer-SQLConfigBase:SqlHealthCheckConnectionString-MXMTYM1IFSQLV1.CORP.JABIL.ORG.DigitalFactoryMTY-PRD"];
        healthCheck.RabbitMQ = response["RabbitMQ-RabbitMQConfigBase:Host-prd.jemsmm.mty.corp.jabil.org"];
        healthCheck.HttpCheck = response["HttpCheck-http://prd.jemsmm.mty.corp.jabil.org:9035/mgmt"];
        healthCheck.ConfigurationVerification = response.ConfigurationVerification;
        healthCheck.diskSpace = response.diskSpace;
        let tmpCv = response.diskSpace.total/1000000000;
        response.diskSpace.total = tmpCv.toFixed(2);
        tmpCv = response.diskSpace.free/1000000000;
        response.diskSpace.free = tmpCv.toFixed(2);
        tmpCv = response.diskSpace.threshold/1000000000;
        response.diskSpace.threshold = tmpCv.toFixed(2);
        return healthCheck;
      })
    );
  }
}
