<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\VehiculeRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass=VehiculeRepository::class)
 * @ApiResource(
 * normalizationContext={
 *      "groups"={"vehicules_read"}
 * },
 * denormalizationContext={"disable_type_enforcement"=true}
 * )
 */
class Vehicule
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"vehicules_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"vehicules_read"})
     * @Assert\NotBlank(message="le nom de la vehicule est obligatoire")
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"vehicules_read"})
     * @Assert\NotBlank(message="le type de la vehicule est obligatoire")
     */
    private $type;

    /**
     * @ORM\Column(type="integer", length=255)
     * @Groups({"vehicules_read"})
     * @Assert\NotBlank(message="le nombre des places est obligatoire")
     */
    private $nombreplace;

    /**
     * @ORM\Column(type="string", length=65000)
     * @Groups({"vehicules_read"})
     * @Assert\NotBlank(message="la description de la vehicule est obligatoire")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"vehicules_read"})
     * @Assert\NotBlank(message="la photo de la vehicule est obligatoire")
     */
    private $photo;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"vehicules_read"})
     */
    private $envedette;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getNombreplace(): ?int
    {
        return $this->nombreplace;
    }

    public function setNombreplace( $nombreplace): self
    {
        $this->nombreplace = $nombreplace;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getEnvedette(): ?bool
    {
        return $this->envedette;
    }

    public function setEnvedette(bool $envedette): self
    {
        $this->envedette = $envedette;

        return $this;
    }
}
