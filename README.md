# Steps to execute code

## Tools we required
  > node.js,
  > remix,
  > vs code


## clone repo

    $ git clone https://github.com/akshaykurhekar/ipfs-rest-api.git
    $ cd ipfs-rest-api

to run code.

We have two parts of code backend and frontend
  
  To run backend code ipfs part
  
    $ npm install
    $ npm run dev

  This will start the server at port 8000 
  
  to run frontend code
    $ cd .\did_frontend\ 
    $ npm install
    $ npm run dev

this will start react.js website in browser at 

 ### Issuer - http://localhost:5173/issuer
 ### Holder - http://localhost:5173/holder
 ### verifier - http://localhost:5173/verifier

IPFS LInk:[Qmdp9wcKdZJMWQPa9XVu32JPTENmiss6KCS6RR8MS8mvTu](https://ipfs.io/ipfs/Qmdp9wcKdZJMWQPa9XVu32JPTENmiss6KCS6RR8MS8mvTu)

1. Now issuer want to issue passport for 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB user.
2. Enter user details in Issuer 
  ![Screenshot 2024-01-28 213603](https://github.com/akshaykurhekar/ipfs-rest-api/assets/55475959/b5775fa0-6312-4290-b252-89e490f700de)
3. After hitting submit button we will get cid tide to that credential and timestamp.
  
5. ![Screenshot 2024-01-28 213859](https://github.com/akshaykurhekar/ipfs-rest-api/assets/55475959/af40c9c0-0fb8-4d4e-8e1f-efd50898cc8c)
6. Now, we need to use this cid to generate DID for user tide to this passport for this user.
7. Open issuer smart contract in remix.
8. call issue function and pass as user wallet address as: 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB and cid: QmSDW4iayfLWSeBj6SfDU3vUQ6yx5jQgfMeFrz9yQVbmNs

![Screenshot 2024-01-28 214750](https://github.com/akshaykurhekar/ipfs-rest-api/assets/55475959/a19e2cd5-ff08-4033-ba38-6dd117bc25d5)

8. Now, we can check it will generate DID.
9. call getCredential funcation pass address we will get did =>  did:passport:QmSDW4iayfLWSeBj6SfDU3vUQ6yx5jQgfMeFrz9yQVbmNs
10. ![Screenshot 2024-01-28 214917](https://github.com/akshaykurhekar/ipfs-rest-api/assets/55475959/f9a1b7db-6798-4bdb-8197-9462e4c153af)
11. now copy and past cid,  ex: QmSDW4iayfLWSeBj6SfDU3vUQ6yx5jQgfMeFrz9yQVbmNs this into Holder.jxs file at line no. 10
12. now, goto Holder webpage and click on "Fetch passport card" button.  We will user passport details.

![Screenshot 2024-01-28 215318](https://github.com/akshaykurhekar/ipfs-rest-api/assets/55475959/982eedbb-7844-43a3-a819-0767251d759f)

13. Now, the verifier wants to verify user age based on passport DID without revealing the user's data as (Zero-knowledge Proof) ZKP.
14. This is default view
15. ![Screenshot 2024-01-28 215641](https://github.com/akshaykurhekar/ipfs-rest-api/assets/55475959/7bbd60fb-2ddd-4ca8-af42-67580aa6db3e)
16. Now pass user cid: QmSDW4iayfLWSeBj6SfDU3vUQ6yx5jQgfMeFrz9yQVbmNs
![Screenshot 2024-01-28 215759](https://github.com/akshaykurhekar/ipfs-rest-api/assets/55475959/a0e0e3f6-d6ab-4f91-981c-10e6b9793b02)
17. User verified now we can see User 18+.

