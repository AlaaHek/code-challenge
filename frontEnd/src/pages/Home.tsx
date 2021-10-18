import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import axios from "axios";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { personCircle } from "ionicons/icons";

import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonAlert,
} from "@ionic/react";

const Home: React.FC = () => {
  const [addMobile, setaddMobile] = useState<string>("");
  const [addName, setaddName] = useState<string>("");
  const [addAddress, setaddAddress] = useState<string>("");

  const [updateId, setupdateId] = useState<string>("");
  const [updateMobile, setupdateMobile] = useState<string>("");
  const [updateName, setupdateName] = useState<string>("");
  const [updateAddress, setupdateAddress] = useState<string>("");

  const [deleteId, setdeleteId] = useState<string>("");

  const [Allinfo, setInfo] = useState<string>("");

  const [DeleteRes, setDeleteRes] = useState<string>("");
  const [UpdateRes, setUpateRes] = useState<string>("");
  const [AddRes, setAddRes] = useState<string>("");

  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleAdd = () => {
    if (!addName || !addAddress || !addMobile) {
      setMessage("Please enter info");
      setIserror(true);
      return;
    }

    const AddData = {
      name: addName,
      address: addAddress,
      mobile_number: addMobile,
    };
    const api = axios.create({
      baseURL: `http://185.82.34.86:8084/Customer/customer/`,
    });

    api
      .post("addCustomer", AddData)
      .then((res) => {
        setAddRes(JSON.stringify(res["data"]));
      })
      .catch((error) => {
        setMessage("Error Connection");
        setIserror(true);
      });
  };

  const handleUpdate = () => {
    if (!updateId || !updateName || !updateAddress || !updateMobile) {
      setMessage("Please enter info");
      setIserror(true);
      return;
    }

    const UpdateData = {
      id: updateId,
      name: updateName,
      address: updateAddress,
      mobile_number: updateMobile,
    };

    const api = axios.create({
      baseURL: `http://185.82.34.86:8084/Customer/customer/`,
    });

    api
      .post("update", UpdateData)
      .then((res) => {
        setUpateRes(JSON.stringify(res["data"]));
      })
      .catch((error) => {
        setMessage("Error Connection");
        setIserror(true);
      });
  };

  const handleDelete = () => {
    if (!deleteId) {
      setMessage("Please enter info");
      setIserror(true);
      return;
    }
    const DeleteData = {
      id: deleteId,
    };
    const api = axios.create({
      baseURL: `http://185.82.34.86:8084/Customer/customer/`,
    });

    api
      .post("deleteById", DeleteData)
      .then((res) => {
        setDeleteRes(JSON.stringify(res["data"]));
      })
      .catch((error) => {
        setMessage("Error Connection");
        setIserror(true);
      });
  };
  const handleGetAll = () => {
    const api = axios.create({
      baseURL: `http://185.82.34.86:8084/Customer/customer/`,
    });

    api
      .post("getAllCustomer", {})
      .then((res) => {
        setInfo(JSON.stringify(res["data"]));
      })
      .catch((error) => {
        setMessage("Error Connection");
        setIserror(true);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenge</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Mobile</IonLabel>
                <IonInput
                  type="number"
                  value={addMobile}
                  onIonChange={(e) => setaddMobile(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Customer Name</IonLabel>
                <IonInput
                  type="text"
                  value={addName}
                  onIonChange={(e) => setaddName(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Customer Location</IonLabel>
                <IonInput
                  type="text"
                  value={addAddress}
                  onIonChange={(e) => setaddAddress(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleAdd}>
                Add
              </IonButton>
            </IonCol>
            <IonCol>
              <IonLabel>{AddRes}</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Cutomer Id</IonLabel>
                <IonInput
                  type="number"
                  value={updateId}
                  onIonChange={(e) => setupdateId(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Customer Name </IonLabel>
                <IonInput
                  type="text"
                  value={updateName}
                  onIonChange={(e) => setupdateName(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Customer Mobile </IonLabel>
                <IonInput
                  type="number"
                  value={updateMobile}
                  onIonChange={(e) => setupdateMobile(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Customer Location </IonLabel>
                <IonInput
                  type="text"
                  value={updateAddress}
                  onIonChange={(e) => setupdateAddress(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleUpdate}>
                Update
              </IonButton>
            </IonCol>
            <IonCol>
              <IonLabel>{UpdateRes}</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Id Customer</IonLabel>
                <IonInput
                  type="number"
                  value={deleteId}
                  onIonChange={(e) => setdeleteId(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleDelete}>
                Delete
              </IonButton>
            </IonCol>
            <IonCol>
              <IonLabel>{DeleteRes}</IonLabel>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleGetAll}>
                Get all customer
              </IonButton>
              <IonLabel>{Allinfo}</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
