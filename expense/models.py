from django.db import models

# Create your models here.
class Transactions(models.Model):
    title = models.CharField(max_length=100)
    amount = models.FloatField()
    tranaction_type = models.CharField(
        max_length=100,
        choices=(("CREDIT","CREDIT"),("DEBIT","DEBIT"))
    )
def save(self, *args, **kwargs):
    if self.tranaction_type == "DEBIT":
        self.amount = abs(self.amount) * -1
    else:
        self.amount = abs(self.amount)
    super().save(*args, **kwargs)
